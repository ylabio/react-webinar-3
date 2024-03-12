import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()} lang-key='add'>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
