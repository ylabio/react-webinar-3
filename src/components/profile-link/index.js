import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function ProfileLink(props) {
  if (!props.show) return null;
  return (
    <Link to={'/profile'} key={'profile'} className={'ProfileLink'}>
      {props.userName}
    </Link>
  );
}

ProfileLink.propTypes = {
  show: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

ProfileLink.defaultProps = {
  userName: '',
};

export default ProfileLink;
