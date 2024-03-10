import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useTranslate } from "../../translate";

function Controls({onAdd}) {
  const {translate}=useTranslate()
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{translate('add')}</button>
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
