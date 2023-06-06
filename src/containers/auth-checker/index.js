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

  const { status } = useSelector(state => ({
    status: state.session.status
  }));

  useEffect(() => {
    if (status == 'failed' || status == 'terminated') // если не смогли авторизоваться то переходим
      navigate(altPage, { state: { from: location } });
  }, [status]);

  // для текста загрузки пока простая заглушка
  return (
    <> { status == 'none' || status == 'loading' ?
      <div style={{textAlign: 'center', color: '#FFFFFF', fontSize: '18px', padding: '50px'}}>
        Подожите, идет проверка пользователя...
      </div>
      : children
    }</>
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