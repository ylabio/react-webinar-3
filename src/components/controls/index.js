import {memo} from "react";
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function Controls({onAdd}) {
  return (
    <div className='Controls'>
      <Button onClick={() => onAdd()}>Добавить</Button>     
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {
  }
}

export default memo(Controls);
