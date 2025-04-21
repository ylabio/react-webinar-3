export default {
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article-comments/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${id}&skip=&limit=*&fields=items%28_id%2Ctext%2CdateCreate%2Cauthor%28_id%2Cprofile%28name%29%29%2Cparent%28_id%2C_type%29%2CisDeleted%29`,
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
        dispatch({ type: 'article-comments/post-comment-end', payload: {answ: res.data.result} });
      } catch (e) {
        console.log(e);
        dispatch({ type: 'article-comments/post-comment-error' , payload:{data: e.message}});
      }
    };
  },
};
