import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from './use-selector';
import { useEffect } from 'react';
import useStore from './use-store';

export default function useAuth({ redirectIfAuthed = false } = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const { isAuth } = useSelector(state => state.user);

  const from = location.state?.from || '/';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await store.actions.user.initUser();

        if (!isAuth) {
          if (location.pathname !== '/login') {
            navigate('/login', {
              replace: true,
              state: { from: location.pathname },
            });
          }
        } else if (redirectIfAuthed && location.pathname === '/login') {
          navigate(from, { replace: true });
        }

      } catch (error) {
        if (location.pathname !== '/login') {
          navigate('/login', {
            replace: true,
            state: { from: location.pathname },
          });
        }
      }
    };

    checkAuth();
  }, [isAuth]);

  return { isAuth };
}
