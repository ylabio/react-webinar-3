import React from 'react';
import {Link} from "react-router-dom";
import './style.css'
import PropTypes from "prop-types";

const UserTools = ({ login, profile, username, onClick }) => {
  return (
    <div className='UserTools'>
      {username
        ? <div>
          <Link className='UserTools-username' to={profile}>
            {username}
          </Link>
          <button onClick={onClick}>Выход</button>
        </div>
        : <Link to={login}>
          <button>Вход</button>
        </Link>
      }
    </div>
  );
};

UserTools.propTypes = {
  login: PropTypes.string,
  profile: PropTypes.string,
  username: PropTypes.string,
  onClick: PropTypes.func
}

UserTools.defaultProps = {
  onClick: () => {}
}

export default React.memo(UserTools);
