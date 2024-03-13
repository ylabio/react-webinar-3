import {memo, useContext} from "react";
import PropTypes from "prop-types";
import './style.css';
import SwitcherLang from "../switcher-lang";
import {LanguageContext} from "../../language-provider.js";

function Head({title}) {

  const { wordsTranslate } = useContext(LanguageContext);
  const localTitle = title === 'Магазин' ? wordsTranslate('store') : title;

  return (
    <div className='Head'>
      <h1>{localTitle}</h1>
      <SwitcherLang/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
