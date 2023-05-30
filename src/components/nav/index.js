import {memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function Nav({translate}) {

  return <Link to='/' className='Nav'>{translate('main-page') ?? 'Главная'}</Link>
}

Nav.propTypes = {
  translate: PropTypes.func
}

Nav.defaultProps = {
  translate: () => null
}

export default memo(Nav);
