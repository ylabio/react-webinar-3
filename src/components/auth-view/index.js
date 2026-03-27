import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import './style.css';

function AuthView(props) {
  return (
    <div className="Authorization">
      {props.isAuth ? (
        <div className='Authorization-container'>
          <Link to="/profile" className="profile">
            {props.username || 'Пользователь'}
          </Link>
          <Button 
            style="text"
            onClick={props.onLogout}
            className="login"
            title={props.logoutTitle}
          />
        </div>
      ) : (
        <div className='Authorization-container'>
          <Link to="/login" className="login">
            {props.loginTitle}
          </Link>
        </div>
      )}
    </div>
  );
}

AuthView.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string,
  onLogout: PropTypes.func.isRequired
};

export default memo(AuthView);