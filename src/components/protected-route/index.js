import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.session.user,
    authStatus: state.session.authStatus,
  }));

  useEffect(() => {
    if (select.authStatus === 'failed' || !select.user) {
      navigate('/login');
    }
  }, [select.user, select.authStatus, navigate]);

  return select.user ? children : null;
}

export default memo(ProtectedRoute);
