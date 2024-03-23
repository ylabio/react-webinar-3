export default {
    /**
     * Загрузка товара
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        // Сброс текущего товара и установка признака ожидания загрузки
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
          });
          // Товар загружен успешно
          dispatch({type: 'comments/load-success', payload: {data: res.data.result}}); // Проверить на data
  
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    },

    add: (parentId, parentType, text, articleId) => {
      const parent = {"_id": parentId}
      if(parentType === "article"){
        parent._type = 'article'
      } else{
        parent._type = 'comment'
      }
      const body = {
        "text": text,
        "parent": parent
      }
      return async (dispatch, getState, services) => {
        try{
          const response = await services.api.request({
            url: '/api/v1/comments',
            method: "POST",
            headers: {"X-Token": localStorage.getItem("X-Token")},
            body: JSON.stringify(body)
          })
          console.log(response);
          // const res = await services.api.request({
          //   url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`
          // });
          // Товар загружен успешно
          // dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

          
          // TODO: Исправить на реальное имя, получить в аругментах
          response.data.result.author.profile = {
            name: "Some name"
          }
          dispatch({type: 'comments/add-new', payload: response.data.result})
        } catch (e){
          dispatch({type: 'comments/add-new-error'})
        }
      }
    }
  }

  console.log(localStorage.getItem("X-Token"));