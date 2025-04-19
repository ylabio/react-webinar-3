import { useSearchParams } from 'react-router-dom';

export default {
  loadAll: () => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const params = new URLSearchParams({
          fields: '*,madeIn(title,code),category(title)',
        });

        const res = await services.api.request({
          url: `/api/v1/comments?${params}`,
        });
        console.log(res);
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
};
