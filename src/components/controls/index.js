import {memo} from "react";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import './style.css';

function Controls({onAdd}) {

  const language = useSelector(state => ({
    language: state.language.language,
    mainTextRu: state.language.ru.main,
    mainTextEn: state.language.en.main,
  }));

  const text = language.language === "ru" ? language.mainTextRu : language.mainTextEn;

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{text.itemButtonText}</button>
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
