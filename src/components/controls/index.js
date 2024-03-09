import {memo, useContext} from "react";
import { LanguageContext } from '../../language-provider';
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}) {
  const { t } = useContext(LanguageContext); 
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{t('buttonAdd')}</button>
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
