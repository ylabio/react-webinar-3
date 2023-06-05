import './style.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function QuitHeader(props) {
  return (
    <div className="quit-header">
      <div className="link">
        <Link to={props.link}>{props.name}</Link>
      </div>
      <div className="link">
        <button onClick={props.onLogout}>Выход</button>
      </div>
    </div>
  );
}

QuitHeader.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  onLogout: PropTypes.func,
};

QuitHeader.defaultProps = {
  onLogout: () => {},
};

export default QuitHeader;
