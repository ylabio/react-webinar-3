export default {
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article-comments/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?limit=100&search%5Bparent%5D=${id}`,
        });
        // Товар загружен успешно
        dispatch({ type: 'article-comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        console.log(e)
        //Ошибка загрузки
        dispatch({ type: 'article-comments/load-error' , payload:{data: e.message}});
      }
    };
  },

  post: (id, type = 'article', text) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'article-comments/post-comment-start' });
      try {
        const res = await services.api.request({
          url: '/api/v1/comments?lang=ru&fields=%2A',
          method: 'POST',
          body: JSON.stringify({
            _id: '',
            text: text,
            parent: { _id: id, _type: type },
          }),
        });
        console.log(res)
        dispatch({ type: 'article-comments/post-comment-end', payload: {answ: res.data.result} });
      } catch (e) {
        console.log(e);
        dispatch({ type: 'article-comments/post-comment-error' , payload:{data: e.message}});
      }
    };
  },
};
