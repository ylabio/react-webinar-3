import { memo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import Spinner from '../spinner';
import useInit from '../../hooks/use-init';

function ProtectedRoute({ children }) {
  const store = useStore();
  const [isAuth, setIsAuth] = useState(null);

  useInit(async () => {
    const authResult = await store.actions.session.checkAuth();
    setIsAuth(authResult);
  }, [store]);

  if (isAuth === null) {
    return <Spinner active={true} />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default memo(ProtectedRoute);