import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LangSwitcher from "../language-switch";
import { content } from "../../store/translation/content";

function Head(props) {

  return (
    <div className='Head'>
      <h1 id='title' lang-key='title'>{props.title === 'Магазин' ? content[props.lang].title : props.title}</h1>
      <LangSwitcher lang={props.lang} switchLang={props.switchLang}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
