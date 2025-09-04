import { getReducerConfig } from '../utils';

export const STATE_KEY = `option`;

export const ACTIONS = {
  SET_IGNORE_NO_CONTENT_FILE: 'SET_IGNORE_NO_CONTENT_FILE',
  SET_BEAUTIFY_FILE: 'SET_BEAUTIFY_FILE',
  SET_URL_FILTER: 'SET_URL_FILTER',
};

export const INITIAL_STATE = {
  ignoreNoContentFile: false,
  beautifyFile: false,
  urlFilter: '',
};

export const setIgnoreNoContentFile = (willIgnore) => ({
  type: ACTIONS.SET_IGNORE_NO_CONTENT_FILE,
  payload: !!willIgnore,
});

export const setBeautifyFile = (willBeautify) => ({
  type: ACTIONS.SET_BEAUTIFY_FILE,
  payload: !!willBeautify,
});

export const setUrlFilter = (filter) => ({
  type: ACTIONS.SET_URL_FILTER,
  payload: filter || '',
});

export const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SET_IGNORE_NO_CONTENT_FILE: {
      return {
        ...state,
        ignoreNoContentFile: action.payload,
      };
    }
    case ACTIONS.SET_BEAUTIFY_FILE: {
      return {
        ...state,
        beautifyFile: action.payload,
      };
    }
    case ACTIONS.SET_URL_FILTER: {
      return {
        ...state,
        urlFilter: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default getReducerConfig(STATE_KEY, uiReducer);
