import {memo} from "react";
import PropTypes from 'prop-types';
import translate from "../../app/language/translate.json";
import {useLangContext} from "../../store/use-lang-context";
import './style.css';

function Controls({onAdd}) {
  const {language} = useLangContext();
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{translate.Add[language]}</button>
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
