import {  } from '../constants/blogConstants'

const INITIAL_STATE = {
  loading: false,
  blogMessage: null,
};

const blogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_BLOGS":
      return {
        ...state,
        loading: false,
        blogMessage: null,
      };

    default:
      return state
  }
};

export default blogReducer;