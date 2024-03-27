export default {

  load: (id) => async (dispatch, getState, services) => {
    dispatch({type: 'comments/load-start'})

    try {
      const res = await services.api.request({
        url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
      })

      dispatch({type: 'comments/load-success', payload: {data: res.data.result.items, count: res.data.result.count}})
    } catch (e) {
      dispatch({type: 'comments/load-error', payload: e})
    }
  },

  update: (data) => {
    return {
      type: 'comments/update',
      payload: data
    }
  },

  create: (parentId, type, text, userId) => async (dispatch, getState, services) => {

    const body = {
      text,
      parent: {_id: parentId, _type: type}
    }

    const res = await services.api.request({
      url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted',
      method: 'POST',
      headers: {'X-Token': userId},
      body: JSON.stringify(body)
    })

    dispatch({
      type: 'comments/create-comment',
      payload: res.data.result
    })
  }
}