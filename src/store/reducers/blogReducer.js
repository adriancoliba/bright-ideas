import { GET_POSTS_SUCCESS, CLEAR_BLOG_MESSAGE, START_LOADING } from '../constants/blogConstants'

const INITIAL_STATE = {
  posts: [],
  loading: false,
  blogMessage: null,
};

const blogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts
      };

    case CLEAR_BLOG_MESSAGE:
      return {...state, profileMessage: null};

    case START_LOADING:
      return { ...state, loading: true };

    default:
      return state
  }
};

export default blogReducer;