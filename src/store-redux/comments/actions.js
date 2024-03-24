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

    add: (parentId, parentType, text, userName = "Some name") => {
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
      console.log(userName);
      return async (dispatch, getState, services) => {
        try{
          const response = await services.api.request({
            url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)',
            method: "POST",
            body: JSON.stringify(body)
          })

          response.data.result.author.profile = {
            name: userName
          }
          dispatch({type: 'comments/add-new', payload: response.data.result})
        } catch (e){
          dispatch({type: 'comments/add-new-error'})
        }
      }
    }
  }

  console.log(localStorage.getItem("X-Token"));