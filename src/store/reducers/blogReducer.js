import { GET_POSTS_SUCCESS, CLEAR_BLOG_POST_MESSAGE, START_LOADING, SET_POST_MESSAGE } from '../constants/blogConstants'

const INITIAL_STATE = {
  posts: [],
  loading: false,
  blogMessage: null,
  postMessage: '',
};

const blogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts
      };
    case SET_POST_MESSAGE:
      return {
        ...state,
        loading: false,
        postMessage: action.error === null ? action.customError : action.error.message,
      };

    case CLEAR_BLOG_POST_MESSAGE:
      return {...state, profileMessage: null, postMessage: ''};

    case START_LOADING:
      return { ...state, loading: true };

    default:
      return state
  }
};

export default blogReducer;