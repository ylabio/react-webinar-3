import { memo, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";

function AuthGuard({ children, redirect }) {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    status: state.login.status,
    waiting: state.login.waiting
  }));

  useEffect(() => {
    const local = localStorage.getItem('token')
    if (!select.status && !select.waiting && !local) {
      navigate(redirect, { state: { back: location.pathname } });
    }
  }, [select.status, select.waiting]);

  if (!select.status || select.waiting) {
    return <h1>Загрузка...</h1>
  } else {
    return children;
  }
}

AuthGuard.propTypes = {
  redirect: PropTypes.string,
  children: PropTypes.node,
}

export default memo(AuthGuard);