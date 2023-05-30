import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd, translate}){
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{translate('add') ?? Добавить}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {},
  translate: () => null
}

export default memo(Controls);
