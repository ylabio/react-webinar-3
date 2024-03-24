import simplifyErrors from '../../utils/simplify-errors';

export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments/?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // На данный момент вроде бы избыточно применять здесь и ниже при добавлении комментария
        // тот же подход, что и при
        // обработке ошибок авторизации, пришлось даже модифицировать утилиту simplifyErrors,
        // чтоб она могла обрабатывать путь в issue, переданный строкой, а не массивом, но логика
        // наверно может расшириться, поэтому сделал так.
        if (!res.data.error) {
          dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
        } else {
          dispatch({type: 'comments/load-error', payload: {errors: simplifyErrors(res.data.error.data.issues)}});
        }
      } catch (e) {
        dispatch({type: 'comments/load-error', payload: {errors: {other: [e.message]}}});
      }
    };
  },
  add: ({id, text, isRoot}) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/add-start'});
      const _type = isRoot ? 'article' : 'comment';
      const data = {text, parent: {_id: id, _type}};
      try {
        const res = await services.api.request({
          url: `/api/v1/comments/?fields=parent(_id,_type),_id,text,dateCreate,author(profile(name),isDeleted)`,
          method: 'POST',
          body: JSON.stringify(data),
        });
        if (!res.data.error) {
          dispatch({type: 'comments/add-success', payload: {data: res.data.result}});
        } else {
          dispatch({
            type: 'comments/add-error',
            payload: {errors: {id, ...simplifyErrors(res.data.error.data.issues)}},
          });
        }
      } catch (e) {
        dispatch({type: 'comments/add-error', payload: {errors: {id, other: [e.message]}}});
      }
    };
  },
  resetErrors: () => ({type: 'comments/reset-errors'}),
};
