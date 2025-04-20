export default {
  /**
   * Загрузка комментариев
   * @param parentId {String}
   */
  load: parentId => async (dispatch, _, services) => {
    dispatch({ type: 'comments/load-start', payload: { parentId } });

    try {
      const { items, count } = await services.api.getComments(parentId);

      if (!Array.isArray(items)) {
        throw new Error(`Expected array, got ${typeof items}`);
      }

      dispatch({
        type: 'comments/load-success',
        payload: { parentId, items, count }
      });
    } catch (e) {
      console.error('Comments load failed:', e);
      dispatch({
        type: 'comments/load-error',
        payload: {
          parentId,
          error: e.message
        }
      });
    }
  },

  /**
   * Добавление комментария
   * @param parentId {String}
   * @param parentType {'article'|'comment'}
   * @param text {String}
   */
  add: (parentId, parentType, text) => {
    return async (dispatch, getState, services) => {
      try {
        const comment = await services.api.addComment(parentId, parentType, text);
        dispatch({
          type: 'comments/add',
          payload: { parentId, comment }
        });
        return comment; // Возвращаем для обработки в компоненте
      } catch (e) {
        console.error('Ошибка добавления комментария:', e);
        throw e; // Пробрасываем для обработки в UI
      }
    };
  }
};
