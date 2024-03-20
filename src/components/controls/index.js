import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onClick, text}) {
  return (
    <div className='Controls'>
      <button onClick={() => onClick()}>{text}</button>
    </div>
  )
}

Controls.propTypes = {
  onClick: PropTypes.func
};

Controls.defaultProps = {
  onClick: () => {
  }
}

export default memo(Controls);
