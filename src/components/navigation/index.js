import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import routes from '../../routes';

import './style.css';
import BackButton from '../back-button';

function Navigation({localize}) {
  return (
    <div className='Navigation'>
      {routes.navigation.map((item, index) => <Link className='Navigation-link' to={item.route} key={`Navigation-link-${item.name}-${index}`}>{localize(item.name)}</Link>)}
      <BackButton localize={localize} />
    </div>
  )
}

Navigation.propTypes = {
  localize: PropTypes.func
}

export default React.memo(Navigation);