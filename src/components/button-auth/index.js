import { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function ButtonAuth({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate('/login', { state: { from: location }, replace: true });
  };

  return onLogout ? (
    <button onClick={onLogout} className="ButtonAuth">
      Выход
    </button>
  ) : (
    <button onClick={handleLoginClick} className="ButtonAuth">
      Вход
    </button>
  );
}

ButtonAuth.propTypes = {
  onLogout: PropTypes.func,
};

export default memo(ButtonAuth);
