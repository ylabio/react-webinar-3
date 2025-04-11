import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function ButtonAuth({ onLogout }) {
  return onLogout ? (
    <button onClick={onLogout} className="ButtonAuth">
      Выход
    </button>
  ) : (
    <Link to="/login" className="ButtonAuth">
      Вход
    </Link>
  );
}
ButtonAuth.propTypes = {
  onLogout: PropTypes.func,
};

export default memo(ButtonAuth);
