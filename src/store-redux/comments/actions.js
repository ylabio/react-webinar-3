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

    createComment: (id,value,type) => {
        return async (dispatch, getState, services) => {
            try{
                const data = {
                    "text":value,
                    "parent": {"_id":  id, "_type":  type}
                }

                const res = await services.api.request({
                    url: '/api/v1/comments',
                    method: 'POST',
                    body: JSON.stringify(data),
                    
                  });
                if (res.status == 200){
                  dispatch({type:"comments/new-comment", payload:{data: res.data.result}})
                }
                

                
            }catch(e){
                console.error(e);
            }
        }
    },


    
}