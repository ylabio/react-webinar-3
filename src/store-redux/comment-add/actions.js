import {REDUX_COMMENT_ADD_ACTION_TYPE} from "./types";

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  commentAdd: (_id, _type, text, successCallback) => {
    return async (dispatch, getState, services) => {

      dispatch({type: REDUX_COMMENT_ADD_ACTION_TYPE.commentAddStart});

      try {
        const res = await services.api.request({
            url: `api/v1/comments`,
            method: 'post',
            body: JSON.stringify({
              text,
              "parent": {
                _id,
                _type,
              }
            })
          }
        );

        successCallback();

        dispatch({type: REDUX_COMMENT_ADD_ACTION_TYPE.commentAddSuccess, payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: REDUX_COMMENT_ADD_ACTION_TYPE.commentAddError, payload: e?.message});
      }
    }
  },
}
