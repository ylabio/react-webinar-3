import { memo } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthButton = ({ title, onClick, routes, userName }) => {
  return (
    <div className="Auth-Container">
      <div className="Auth-Button-wrapper">
        {userName && (
          <Link to={routes.profile} className="Auth-User-name">
            {userName}
          </Link>
        )}
        <Link to={routes.login}>
          <button className="Auth-Button" type="button" onClick={onClick}>
            {title}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default memo(AuthButton);

AuthButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  route: PropTypes.object,
  userName: PropTypes.string,
};
