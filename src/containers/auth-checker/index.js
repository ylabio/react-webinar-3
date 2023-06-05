import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";

/**
 * Обертка для чего-то, что требует авторизованного пользователя. С переадресацией на страницу altPage, если надо.
 */
function AuthChecker({ children, altPage }) {

  const navigate = useNavigate();
  const location = useLocation();

  const { user, waiting } = useSelector(state => ({
    user: state.session.user,
    waiting: state.session.waiting
  }));

  useEffect(() => {
    if (!user && !waiting) // если нет юзера, и ничего не грузится, то перенаправляем
      navigate(altPage, { state: { from: location } });
  }, [user, waiting]);

  return (
    <Spinner active={waiting}>
      {user ? children : null}
    </Spinner>
  );
}

AuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
  altPage: PropTypes.node.isRequired,
}

AuthChecker.defaultProps = {
  //altPage: '/',
}

export default React.memo(AuthChecker);