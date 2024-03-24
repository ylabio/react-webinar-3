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
          dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    },

    saveComment: (text, id, type) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});

        try {
          // ----- Сохранения комментария 
          await services.api.request({
            url:'api/v1/comments?lang=ru&fields=*', method:'POST', 
            body: JSON.stringify({
              "text": `${text}`,
              "parent": 
                {
                  "_id":  `${id}`, 
                  "_type":  `${type}`
                } 
            })
          });
          // ----- Успешное сохранение
          dispatch({type: 'comments/load-success'});
        } catch (e){
          dispatch({type: 'comments/load-error'});
        }
        
      }

    }
  }