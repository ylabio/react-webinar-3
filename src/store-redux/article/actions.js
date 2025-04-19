export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article/load-start' });

      try {
        const params = new URLSearchParams({
          fields: '*,madeIn(title,code),category(title)',
        });
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?${params}`,
        });
        // Товар загружен успешно
        dispatch({ type: 'article/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article/load-error' });
      }
    };
  },
};
