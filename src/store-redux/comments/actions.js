import listToTree from '../../utils/list-to-tree';

export default {
  /**
   * Загрузка комментариев по ID
   */
  load: articleId => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=${encodeURIComponent(
            'items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count',
          )}&limit=*&search[parent]=${articleId}`,
        });

        // фильтрация валидных комментариев
        const validItems = res.data.result.items.filter(item => item._id && !item.isDeleted);

        const tree = listToTree(validItems);

        dispatch({ type: 'comments/load-success', payload: { items: tree } });
        dispatch({ type: 'comments/set-article-id', payload: { articleId } });
        dispatch({ type: 'comments/reset-form-target' });

        return Promise.resolve();
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
        return Promise.reject(e);
      }
    };
  },

  /**
   * Создание комментария или ответа
   */
  create: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/create-start' });

      try {
        // Создаем комментарий
        await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({ text, parent }),
        });

        dispatch({ type: 'comments/create-success' });

        // Перезагружаем комментарии с сервера
        const articleId = parent._type === 'article' ? parent._id : getState().comments.articleId;
        const resLoad = await services.api.request({
          url: `/api/v1/comments?fields=${encodeURIComponent(
            'items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count',
          )}&limit=*&search[parent]=${articleId}`,
        });

        const validItems = resLoad.data.result.items.filter(item => item._id && !item.isDeleted);
        const tree = listToTree(validItems);

        dispatch({ type: 'comments/load-success', payload: { items: [...tree] } });
        dispatch({ type: 'comments/set-article-id', payload: { articleId } });
        dispatch({ type: 'comments/reset-form-target' });
      } catch (e) {
        dispatch({
          type: 'comments/create-error',
          payload: e.message || 'Ошибка создания',
        });
      }
    };
  },

  setFormTarget: id => ({ type: 'comments/set-form-target', payload: id }),
  resetFormTarget: () => ({ type: 'comments/reset-form-target' }),
};
