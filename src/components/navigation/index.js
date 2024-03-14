import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Navigation({children}) {
  return (
    <div className="Navigation">
      {children}
    </div>
  )

}

Navigation.propTypes = {
  children: PropTypes.node
}

export default memo(Navigation);
