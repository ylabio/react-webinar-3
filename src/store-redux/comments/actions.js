export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items, count: res.data.result.count } });
        // console.log('getState: ', getState());
        // console.log('services: ', services);
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error', payload: { error: e ? e : 'true' } });
      }
    };
  },

  post: (text, parentId, parentType = "article") => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/post-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            text: text,
            parent: {_id: parentId, _type: parentType}
          })
        });
        dispatch({ type: 'comments/post-success', });
        return res;
      } catch (e) {
        dispatch({ type: 'comments/post-error', payload: { error: e || 'true' } });
        throw e;
      }
    }
  }
};
