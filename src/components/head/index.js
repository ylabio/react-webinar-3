import {memo} from "react";
import {useLangContext} from "../../store/use-lang-context";
import PropTypes from "prop-types";
import './style.css';

function Head({title}) {

  const { language, setLanguage} = useLangContext();

  function changeValue() {
    setLanguage(event.target.value);
 }

  return (
    <div className='Head'>
      <div>
        <h1>{title}</h1>
      </div>
      <div className="switch-lang">
        <label htmlFor="Ru">Ru</label>
        <input type="radio" id="Ru" name="radio" value="Ru"
        checked={language == 'Ru' ? true : false}
        onChange={changeValue} />

        <label htmlFor="En">En</label>
        <input type="radio" id="En" name="radio" value="En"
        checked={language == 'En' ? true : false}
        onChange={changeValue} />
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
