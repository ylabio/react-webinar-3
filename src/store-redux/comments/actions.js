
export default {
    /**
     * Загрузка комметариев товара
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?search%5Bparent%5D=${id}&skip=0&limit=*&fields=items(author(profile(name)),*),count`
          });
          // Комментарии загружены успешно
          dispatch({type: 'comments/load-success', payload: {data: res.data.result.items,count : res.data.result.count}});
          
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    },
    addComment: (body) => {
      body = JSON.stringify(body)
      return async (dispatch, getState, services) => {
        try {
          const res = await services.api.request({
            method : "POST",
            url: `/api/v1/comments?lang=ru&fields=*,author(profile(name))`,
            body : body,
          }
          );
          const newComments = [...getState().comments.data, res.data.result];
          const count = getState().comments.count + 1;
          dispatch({ type: 'comments/add-reply', payload: { data: newComments,count : count} });

        } catch (e) {
          console.log(e)
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
  }
}
  