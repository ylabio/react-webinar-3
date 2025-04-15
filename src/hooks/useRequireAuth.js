import { useState, useEffect } from 'react';
import useStore from './use-store'; // твой хук для доступа к store
import useSelector from './use-selector';

function useRequireAuth() {
  const store = useStore();
  const auth = useSelector(state => state.auth);

  const [authState, setAuthState] = useState({
    token: auth.token,
    user: auth.user,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setAuthState({
        token: null,
        user: null,
        loading: false,
        error: 'Нет токена',
      });
      return;
    }

    const check = async () => {
      try {
        await store.actions.auth.checkTokenValidity(token);

        setAuthState({
          token: store.getState().auth.token,
          user: store.getState().auth.user,
          loading: false,
          error: null,
        });
      } catch (err) {
        localStorage.removeItem('authToken');
        setAuthState({
          token: null,
          user: null,
          loading: false,
          error: 'Токен невалиден',
        });
      }
    };

    check();
  }, [store]);

  return authState;
}

export default useRequireAuth;
