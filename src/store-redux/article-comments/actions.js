import simplifyErrors from '../../utils/simplify-errors';

export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(*,author(profile(name)))`
        });

        if (res.error) {
          // Ошибка при загрузке
          dispatch({ type: 'comments/load-error', payload: { error: simplifyErrors(res.error.data.issues) } });
        } else {
          dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
        }

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/load-error', payload: { error: e.message } });
      }
    };
  },

  send: (comment) => {
    //console.log('comment to send:', comment)
    return async (dispatch, getState, services) => {
      try {
        dispatch({ type: 'comments/send' });

        const res = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify({
            text: comment.text,
            parent: {
              _id: comment.parentId || comment.id,
              _type: comment.parentId ? 'comment' : 'article'
            }
          })
        });
        dispatch({ type: 'comments/send-success', payload: { data: res.data.result } });

      } catch (e) {
        // Ошибка отправки
        dispatch({ type: 'comments/send-error' });
      }
    }
  },
};