import { myFirebase } from "../../utils/firebase";
import { GET_POSTS_SUCCESS, CLEAR_BLOG_MESSAGE, START_LOADING} from "../constants/blogConstants";
import firebase from "firebase";

export const getPosts = () => dispatch => {
  myFirebase
    .firestore()
    .collection('posts')
    .orderBy("date", "desc")
    .onSnapshot(serverUpdate => {
      const posts = serverUpdate.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      dispatch(getPostsSuccess(posts));
    })
};

export const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    posts,
  }
};

export const clearMessage = () => {
  return {
    type: CLEAR_BLOG_MESSAGE,
  }
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  }
};
