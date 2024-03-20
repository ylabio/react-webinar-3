import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';

const PrivateRoute = ({ check, redirectPath, children }) => {
  const store = useStore();
  const [waiting, setWaiting] = useState(true);

  useInit(() => {
    store.actions.user.initParams()
      .then(() => {
        setWaiting(false);
      });
  }, [], true);

  if (waiting) {
    return <Spinner active={true} />;
  }

  return (
    check ? <>{children}</> : <Navigate to={redirectPath} />
  );
};

export default PrivateRoute;
