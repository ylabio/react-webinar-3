export default{

    load: (id) => {
        return async (dispatch, getState, services) => {
          
          dispatch({type: 'comments/load-start'});
            
          try {
            const res = await services.api.request({
              url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
            });
            
            dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
    
          } catch (e) {
            
            dispatch({type: 'comments/load-error'});
          }
        }
      },

    createFirstComment: (id,value) => {
        return async (dispatch, getState, services) => {
            try{
                
                const data = {
                    "text":value,
                    "parent": {"_id":  id, "_type":  "article"}
                }
                const res = await services.api.request({
                    url: '/api/v1/comments',
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{"X-Token":localStorage.getItem('token')}
                    
                  });
        
                
            }catch(e){
                console.error(e);
            }
        }
    },

    createAnswerComment: (id,value) => {
        return async (dispatch, getState, services) => {
            try{
                const data = {
                    "text":value,
                    "parent": {"_id":  id, "_type":  "comment"}
                }
                const res = await services.api.request({
                    url: '/api/v1/comments',
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{"X-Token":localStorage.getItem('token')}
                    
                  });
                
            }catch(e){
                console.error(e);
            }
        }
    }

    
}