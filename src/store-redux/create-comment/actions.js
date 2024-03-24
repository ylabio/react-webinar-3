import commentsActions from '../comments/actions'

export default {

  create: (parentId, type, text, userId) => async (dispatch, getState, services) => {
    dispatch({ type: 'create-comment/load-start' })

    console.log({
      parentId,
      type,
      text,
      userId
    })

    try {
      const body = {
        text,
        parent: { _id: parentId, _type: type }
      }

      const res = await services.api.request({
        url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted',
        method: 'POST',
        headers: {'X-Token': userId},
        body: JSON.stringify(body)
      })

      dispatch({
        type: 'create-comment/load-success',
        payload: res.data.result
      })

      dispatch(commentsActions.update(res.data.result))
    } catch (e) {
      dispatch({
        type: 'create-comment/load-error',
        payload: e
      })
    }
  }
}