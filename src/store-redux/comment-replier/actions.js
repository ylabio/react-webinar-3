export default {

  setActive: (type)  => {
    return {
      type: 'comment-replier/set-active',
      payload: type
    }
  },

  setArticle: (id) => {
    return {
      type: 'comment-replier/set-article',
      payload: id
    }
  },

  setComment: (id) => {
    return {
      type: 'comment-replier/set-comment',
      payload: id
    }
  },

}