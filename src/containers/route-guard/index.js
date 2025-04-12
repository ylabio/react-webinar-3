// components/RouteGuard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function RouteGuard({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useSelector(state => state.login);

  useEffect(() => {
    if (isAuth === false) navigate('/');
  }, [isAuth]);

  if (isAuth === null) return null;
  return children;
}

export default RouteGuard;
