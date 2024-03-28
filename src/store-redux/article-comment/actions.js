export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (data) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'article-comment/load-start'});

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify(data)
        });

        // Товар загружен успешно
        dispatch({type: 'article-comment/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'article-comment/load-error'});
      }
    }
  },
}
