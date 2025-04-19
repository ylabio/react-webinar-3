import listToTree from '../../utils/list-to-tree';

export default {
  loadAll: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const params = new URLSearchParams({
          fields: '*,madeIn(title,code),category(title)',
          'search[parent]': id,
        });

        const res = await services.api.request({
          url: `/api/v1/comments?${params}`,
        });

        const data = listToTree(res.data.result.items);

        dispatch({
          type: 'comments/load-success',
          payload: { data },
        });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  getAuthor: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-author-start' });

      if (getState().comments.authors[id]) {
        console.log('author already loaded');
        return;
      }

      dispatch({ type: 'comments/load-author-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/users/${id}`,
        });

        const data = res.data.result;

        dispatch({
          type: 'comments/load-author-success',
          payload: { id, data },
        });
      } catch (e) {
        console.error(e);
        dispatch({ type: 'comments/load-author-error' });
      }
    };
  },
};
