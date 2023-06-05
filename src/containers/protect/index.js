import { memo, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Protect({ children }) {
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    isChecked: state.user.isChecked,
  }));

  useEffect(() => {
    if (!select.isAuth && select.isChecked) navigate('/login');
  });

  return <>{select.isAuth ? children : <></>}</>;
}

export default memo(Protect);
