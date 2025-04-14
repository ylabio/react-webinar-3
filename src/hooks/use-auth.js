import { useEffect } from 'react';
import useSelector from './use-selector';
import { useNavigate } from 'react-router-dom';

function useAuth(redirectTo = '/') {
  const session = useSelector(state => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.token) {
      navigate(redirectTo);
    }
  }, [session.token, navigate, redirectTo]);

  return !!session.token; // Возвращаем статус авторизации
}

export default useAuth;
