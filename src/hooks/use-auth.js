import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import useStore from './use-store';
import useSelector from './use-selector';

export default function useAuth({ redirectIfAuthed = false } = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const { isAuth, token } = useSelector(state => state.user);
  const authChecked = useRef(false);
  const from = location.state?.from || '/';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await store.actions.user.initUser();
        authChecked.current = true;

        const currentState = store.getState().user;
        
        if (!currentState.isAuth && location.pathname !== '/login') {
          navigate('/login', {
            replace: true,
            state: { from: location.pathname },
          });
        }
        else if (redirectIfAuthed && currentState.isAuth && location.pathname === '/login') {
          navigate(from, { replace: true });
        }
      } catch (error) {
        authChecked.current = false;
        if (location.pathname !== '/login') {
          navigate('/login', {
            replace: true,
            state: { from: location.pathname },
          });
        }
      }
    };

    checkAuth()
  }, [token, isAuth, navigate, store, location.pathname, from, redirectIfAuthed]);

  return { isAuth };
}