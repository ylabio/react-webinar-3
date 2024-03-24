export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load:function (id){
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // комментарии успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items, count:res.data.result.count}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  addComment:function (id,type,comment,userName){
    return async (dispatch, getState, services) => {
      let body=JSON.stringify({
        text: comment,
        parent: {_id: id, _type: type}
      })
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body
        },)
        const newComment = {...res.data.result,author:{...res.data.result.author,profile:{...res.data.result.profile,name:userName}}}
        dispatch({ type: 'comments/add-success', payload: newComment });
      } catch (e) {
        //Ошибка загрузки
        // dispatch({type: 'comments/load-error'});
      }
    }
  },
}
