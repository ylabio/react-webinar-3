import {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function Menu({text}) {
  return (
    <div className="Menu">
      <Link to="/" className="Menu-link">
        {text}
      </Link>
    </div>
  )

}

Menu.propTypes = {
  text: PropTypes.string,
};

Menu.defaultProps = {
  text: 'Главная',
}

export default memo(Menu);
