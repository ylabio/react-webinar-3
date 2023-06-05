import './style.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthHeader(props) {
  return (
    <div className="auth-header">
      <div className="link">
        <Link to={props.link}>
          <button>Вход</button>
        </Link>
      </div>
    </div>
  );
}

AuthHeader.propTypes = {
  link: PropTypes.string,
};

AuthHeader.defaultProps = {
  link: '',
};

export default AuthHeader;
