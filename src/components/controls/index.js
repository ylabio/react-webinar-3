import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd, t }) {  
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{t('buttonAdd')}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  t: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
