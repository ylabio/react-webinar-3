import {memo} from "react";
import PropTypes from 'prop-types';
import {useLanguage} from '../../localization/language-context'
import texts from '../../localization/texts';
import './style.css';

function Controls({onAdd}) {

  const {language} = useLanguage();

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{texts[language].add}</button>
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
