import {memo, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import PropTypes from 'prop-types';

/**
 * Проверка авторизации на странице
 * Если пользователь не авторизован, перенаправляем по переданному адресу
 */
function AuthGuard({link, children}) {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isLogged: state.auth.isLogged,
    token: state.auth.token,
  }));

  useEffect(() => {
    if (!select.isLogged && !select.token) {
      navigate(link);
    }
  }, [select.isLogged, select.token, navigate])

  return (
    <>
      {children}
    </>
  )
}

AuthGuard.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
}

export default memo(AuthGuard);