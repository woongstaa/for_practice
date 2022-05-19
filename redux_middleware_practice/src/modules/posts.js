import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';
import * as postAPI from '../api/posts';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.

// export const getPosts = () => async dispatch => {
//   dispatch({ type: GET_POSTS });
//   try {
//     const posts = await postAPI.getPosts();
//     dispatch({ type: GET_POSTS_SUCCESS, posts });
//   } catch (error) {
//     dispatch({ type: GET_POSTS_ERROR, error: error });
//   }
// };

// export const getPost = () => async dispatch => {
//   dispatch({ type: GET_POST });
//   try {
//     const post = await postAPI.getPostById();
//     dispatch({ type: GET_POST_SUCCESS, post });
//   } catch (error) {
//     dispatch({ type: GET_POST_ERROR, error: error });
//   }
// };

export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postAPI.getPostById);

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      // return handleAsyncActions(GET_POSTS, 'posts')(state, action);
      const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
      return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post')(state, action);
    default:
      return state;
  }
}
