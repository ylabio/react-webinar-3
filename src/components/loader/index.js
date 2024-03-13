import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Loader({isLoading, children}) {

  return (
    <div className="Loader">
        {isLoading 
          ? <div className="Loader-wrapper">
              <h2>Загрузка...</h2>
            </div>
          : <div className="Loader-content">
              {children}
            </div>
        }
    </div>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
}

export default memo(Loader);