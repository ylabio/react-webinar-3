export default {
  /**
   * Вход пользователя
   * @param {Object} data - {email, password}
   * @return {Promise<{success: boolean, errors?: Object}>}
   */
  signIn: (data) => async (dispatch, _, services) => {
    dispatch({ type: 'session/sign-in-start' });

    try {
      const res = await services.api.request({
        url: '/api/v1/users/sign',
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (res.data.error) {
        dispatch({
          type: 'session/sign-in-error',
          payload: { errors: res.data.error.data.issues }
        });
        return { success: false, errors: res.data.error.data.issues };
      }

      const { token, user } = res.data.result;
      localStorage.setItem('token', token);
      services.api.setHeader('X-Token', token);

      dispatch({
        type: 'session/set',
        payload: { user, token, exists: true }
      });

      return { success: true };
    } catch (e) {
      console.error('Sign in failed:', e);
      dispatch({ type: 'session/sign-in-error' });
      return { success: false };
    }
  },

  /**
   * Выход пользователя
   * @return {Promise<void>}
   */
  signOut: () => async (dispatch, _, services) => {
    try {
      await services.api.request({
        url: '/api/v1/users/sign',
        method: 'DELETE'
      });
    } catch (e) {
      console.error('Sign out error:', e);
    } finally {
      localStorage.removeItem('token');
      services.api.setHeader('X-Token', null);
      dispatch({ type: 'session/clear' });
    }
  },

  /**
   * Проверка существующей сессии
   * @return {Promise<void>}
   */
  remind: () => async (dispatch, _, services) => {
    dispatch({ type: 'session/remind' });
    const token = localStorage.getItem('token');

    if (!token) {
      return dispatch({
        type: 'session/set',
        payload: { exists: false, waiting: false }
      });
    }

    try {
      services.api.setHeader('X-Token', token);
      const res = await services.api.request({
        url: '/api/v1/users/self',
        timeout: 5000
      });

      dispatch({
        type: 'session/set',
        payload: {
          user: res.data.result,
          token,
          exists: true,
          waiting: false
        }
      });
    } catch (e) {
      console.error('Session remind failed:', e);
      localStorage.removeItem('token');
      dispatch({
        type: 'session/set',
        payload: { exists: false, waiting: false }
      });
    }
  },

  /**
   * Сброс ошибок авторизации
   * @return {Object}
   */
  resetErrors: () => ({ type: 'session/reset-errors' })
};
