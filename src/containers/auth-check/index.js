import {memo, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import PropTypes from 'prop-types';

/**
 * Проверка авторизации на странице
 * Если пользователь не авторизован, перенаправляем по переданному адресу
 */
function AuthCheck({redirect, children}) {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    isLogged: state.auth.isLogged,
    token: state.auth.token,
  }));

  useEffect(() => {
    if (!select.isLogged && !select.token) {
      navigate(redirect, {state: {back: location.pathname}});
    }
  }, [select.isLogged, select.token])

  return (
    <>
      {children}
    </>
  )
}

AuthCheck.propTypes = {
  redirect: PropTypes.string,
  children: PropTypes.node,
}

export default memo(AuthCheck);