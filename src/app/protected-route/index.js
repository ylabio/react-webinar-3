import { useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

/**
 * Маршрут, защищающий данные от неавторизованных пользователей
 */
function ProtectedRoute({ children }) {
  const store = useStore();
  const navigate = useNavigate();
  const { token, user } = useSelector(state => state.login || {});

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else if (!user) {
      store.actions.login.autoLogin();
    }
  }, [token, user, store, navigate]);

  return token ? children : null;
}

export default ProtectedRoute;