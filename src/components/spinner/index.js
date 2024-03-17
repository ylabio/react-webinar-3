import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Spinner({active, children, wait}) {

  const cn = bem('Spinner')

  if (active) {
    return <div className={cn({wait})}>{
              wait ? <div className={cn('content')}><span>Loading...</span></div> : children}
           </div>
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
  wait: PropTypes.bool,
};

Spinner.defaultProps = {
  wait: false
}

export default memo(Spinner);
