import {memo} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './style.css';

function AuthHeader(props) {
  return (
    <div className='AuthHeader'>
      {props.token ?
      <>
        <Link className='AuthHeader-profile-link' to={props.link}>{props.userName}</Link>
        <button onClick={() => props.onSignOut(props.token)}>{props.buttonTitle}</button>
      </> :
      <Link to={props.link}><button>{props.buttonTitle}</button></Link>
      }
    </div>
  )
}

AuthHeader.propTypes = {
  token: PropTypes.string,
  userName: PropTypes.string,
  link: PropTypes.string,
  buttonTitle: PropTypes.string,
  onSignOut: PropTypes.func,
};

AuthHeader.defaultProps = {
  token: '',
  userName: '',
  link: '',
  buttonTitle: '',
  onSignOut: () => {},
}

export default memo(AuthHeader);
