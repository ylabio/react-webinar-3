export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });

        dispatch({type: 'comments/load-success', payload: {comments: res.data.result.items, count: res.data.result.count,}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  createNewComment: (id, type, text, userName) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify(
            {
              "text": text,
              "parent": {
                "_id" : id,
                "_type": type
              }
            }
          )
        });
        dispatch({type: 'comments/create-new', payload: {comment: {
              ...res.data.result,
              author: {
                ...res.data.result.author,
                profile: {
                  name: userName,
                }
              },
              children: [],
        }}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
