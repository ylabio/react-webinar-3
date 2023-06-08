import simplifyErrors from '../../utils/simplify-errors';

export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(*,author(profile(name)))`
        });

        if (json.error) {
          // Ошибка при загрузке
          dispatch({ type: 'comments/load-error', payload: { error: simplifyErrors(json.error.data.issues) } });
        } else {
          //console.log('actioin load: result:', json.data.result);
          dispatch({ type: 'comments/load-success', payload: { data: json.data.result } });
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

        const json = await services.api.request({
          //url: `/api/v1/comments?fields=*,author(profile)`,
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify({
            text: comment.text,
            parent: {
              _id: comment.parentId || comment.id, // что доступно, то и применяем, id товара или id коммента
              _type: comment.parentId ? 'comment' : 'article' // изначально парент - сам товар
            }
          })
        });

        //console.log('actioin send: result:', json.data.result);
        dispatch({ type: 'comments/send-success', payload: { data: json.data.result } });

      } catch (e) {
        // Ошибка отправки
        dispatch({ type: 'comments/send-error' });
      }
    }
  },

  // для тестов, к задаче не относится
  remove: (id) => {
    return async (dispatch, getState, services) => {
      try {
        dispatch({ type: 'comments/remove' });

        const json = await services.api.request({
          url: `/api/v1/comments/${id}`,
          method: 'DELETE'
        });

        if (json.error) {
          dispatch({ type: 'comments/remove-error' });
        } else
          dispatch({ type: 'comments/remove-success' });

      } catch (e) {
        dispatch({ type: 'comments/remove-error' });
      }
    }
  }
};