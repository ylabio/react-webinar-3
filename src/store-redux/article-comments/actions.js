export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id,scrollY) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'article-comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}&lang=${services.i18n.lang}`
        });
        // Товар загружен успешно
        dispatch({type: 'article-comments/load-success', payload: {data: res.data.result, scrollY: scrollY}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'article-comments/load-error'});
      }
    }
  },
}
