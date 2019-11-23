import { myFirebase } from "../../utils/firebase";
import { GET_POSTS_SUCCESS, CLEAR_BLOG_POST_MESSAGE, START_LOADING, SET_POST_MESSAGE} from "../constants/blogConstants";

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

export const postCommentToPost = (id, allComments) => dispatch => {
  const postRef = myFirebase.firestore().collection('posts').doc(id);
  return postRef.update({
    comments: allComments
    })
    .then(function() {
      return dispatch(showPostMessage(null, 'successful'))
    })
    .catch(function(error) {
      return dispatch(showPostMessage(error, null))
    });
};

export const showPostMessage = (error, customError) => {
  return {
    type: SET_POST_MESSAGE,
    error,
    customError
  }
};

export const clearMessage = () => {
  return {
    type: CLEAR_BLOG_POST_MESSAGE,
  }
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  }
};
