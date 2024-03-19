import {memo, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import PropTypes from 'prop-types';

/**
 * Проверка авторизации на странице
 * Если пользователь не авторизован, перенаправляем по переданному адресу
 */
function AuthGuard({redirect, children}) {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
    token: state.auth.token,
  }));

  useEffect(() => {
    if (!select.isLogged && !select.token) {
      navigate(redirect);
    }
  }, [select.isLogged, select.token, navigate])

  return (
    <>
      {children}
    </>
  )
}

AuthGuard.propTypes = {
  redirect: PropTypes.string,
  children: PropTypes.node,
}

export default memo(AuthGuard);