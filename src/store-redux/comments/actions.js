import listToTree from "../../utils/list-to-tree";

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
            url: `/api/v1/comments?search%5Bparent%5D=${id}&skip=0&fields=items(author(profile(name)),*),count`
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
      const isZeroLevelComment = body.parent._type === "article"
      body = JSON.stringify(body)
      return async (dispatch, getState, services) => {
        try {
          const res = await services.api.request({
            method : "POST",
            url: `/api/v1/comments?lang=ru&fields=*,author(profile(name))`,
            body : body,
          }
          );
          
          const count = getState().comments.count + 1;
          if (isZeroLevelComment) {
            const newComments = [...getState().comments.data, res.data.result];
            dispatch({ type: 'comments/add-reply', payload: { data: newComments,count : count} });
        } else {
            const newComments = getState().comments.data.map(el => {
                if (el._id === res.data.result.parent._id) {
                    return [el, res.data.result];
                }
                return el;
            }).flat();
            dispatch({ type: 'comments/add-reply', payload: { data: newComments,count : count} });
        }
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
  }
}
  