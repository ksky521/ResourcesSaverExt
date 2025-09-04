export const pause = async (timeout) => {
  return new Promise((res) => {
    setTimeout(res, timeout);
  });
};

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const logIfDev = (...props) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEVTOOL]', ...props);
  }
};

/**
 * Simple glob pattern matching
 * Supports * (wildcard) and ** (recursive wildcard)
 * Supports multiple patterns separated by | (pipe)
 * @param {string} pattern - glob pattern(s), can be separated by |
 * @param {string} str - string to match
 * @returns {boolean} - whether the string matches the pattern
 */
export const globMatch = (pattern, str) => {
  if (!pattern || pattern.trim() === '') return true; // Empty pattern matches everything
  if (!str) return false;
  
  // Split pattern by | to support multiple patterns
  const patterns = pattern.split('|').map(p => p.trim()).filter(p => p);
  
  // If no valid patterns after filtering, match everything
  if (patterns.length === 0) return true;
  
  // If any pattern matches, return true
  return patterns.some(singlePattern => {
    // Convert single glob pattern to regex pattern
    let regexPattern = '';
    let i = 0;
    
    while (i < singlePattern.length) {
      const char = singlePattern[i];
      
      if (char === '*') {
        if (i + 1 < singlePattern.length && singlePattern[i + 1] === '*') {
          // Handle ** (match any number of directories)
          if (i + 2 < singlePattern.length && singlePattern[i + 2] === '/') {
            regexPattern += '(.*\/)?';
            i += 3; // Skip **/ 
          } else {
            regexPattern += '.*';
            i += 2; // Skip **
          }
        } else {
          // Handle single * (match any characters)
          regexPattern += '.*';
          i++;
        }
      } else if (char === '?') {
        regexPattern += '.';
        i++;
      } else {
        // Escape special regex characters
        if (/[.+^${}()|[\]\\]/.test(char)) {
          regexPattern += '\\' + char;
        } else {
          regexPattern += char;
        }
        i++;
      }
    }
    
    // Anchor the pattern
    regexPattern = '^' + regexPattern + '$';
    
    try {
      const regex = new RegExp(regexPattern, 'i'); // Case insensitive
      return regex.test(str);
    } catch (e) {
      console.warn('[DEVTOOL] Invalid glob pattern:', singlePattern, e);
      return false;
    }
  });
};
