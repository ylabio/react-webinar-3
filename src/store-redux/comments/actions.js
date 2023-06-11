import {REDUX_COMMENTS_ACTION_TYPE} from "./types";

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  loadCommentList: (articleId) => {
    return async (dispatch, getState, services) => {

      dispatch({type: REDUX_COMMENTS_ACTION_TYPE.commentsLoadStart});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${articleId}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });

        dispatch({type: REDUX_COMMENTS_ACTION_TYPE.commentsLoadSuccess, payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: REDUX_COMMENTS_ACTION_TYPE.commentsLoadError, payload: e?.message});
      }
    }
  },
}
