import SessionState from "../../store/session";
export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */

fetchComments: (articleId) => async (dispatch, getState, services) => {
        dispatch({ type: 'FETCH_COMMENTS_START' });
        try {
            const response = await services.api.request({
                url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`,
            });
            dispatch({
                type: 'FETCH_COMMENTS_SUCCESS',
                payload: {
                    items: response.data.result.items,
                    count: response.data.result.count
                }
            });
            console.log(response.data.result.items);
        } catch (error) {
            dispatch({ type: 'FETCH_COMMENTS_FAILURE', payload: error });
        }
    },

    submitComment: (commentData) => async (dispatch, getState, services) => {
        const actionTypePrefix = commentData.parent._type === "article" ? 'CREATE_COMMENT' : 'CREATE_REPLY';
        dispatch({ type: `${actionTypePrefix}_START` });
        try {
            const response = await services.api.request({
                method: 'POST',
                url: `/api/v1/comments`,
                body: JSON.stringify(commentData),
            });
            dispatch({ type: `${actionTypePrefix}_SUCCESS`, payload: response.data.result });
            console.log(' comment data:', JSON.stringify(commentData));
            console.log('response.data.result', response.data.result);
            console.log('actionTypePrefix', actionTypePrefix);

        } catch (error) {
            console.log(error);
            dispatch({ type: `${actionTypePrefix}_FAILURE`, payload: error });
        }
    },
}
