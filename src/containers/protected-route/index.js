import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

const Protected = ({ onlyUnAuth = false, component }) => {
  const select = useSelector(state => ({
    user: state.auth.user,
    isAuthChecked: state.auth.isAuthChecked,
  }));
  const location = useLocation();

  if (!select.isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  // Если авторизованный пользователь пытается попасть на страницу для неавторизованных, перекидываем на главную
  if (onlyUnAuth && select.user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={`${from.pathname}${from.search}`} />;
  }

  // Если неавторизованный пользователь пытается попасть на страницу для авторизованных, перекидываем на логин
  if (!onlyUnAuth && !select.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth component={component} />;

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.node,
};
