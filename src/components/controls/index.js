import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useTranslation } from "../../utils/useTranslition";
function Controls({onAdd}) {
    const t = useTranslation();
  return (
    <div className='Controls'>
          <button onClick={() => onAdd()}>{t('addItem')}</button>
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
