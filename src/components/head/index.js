import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import SwitchLang from '../switch-lang'

function Head({title, lang, changeLang}) {
  return (
    <div className='Head'>
      <h1 className={`${title === 'Магазин' && 'lng-title'}`}>{title}</h1>
      <div className='Head__switcher'>
        <SwitchLang lang={lang} changeLang={changeLang}/>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  changeLang: PropTypes.func
};

Head.defaultProps = {
  changeLang: () => {}
}

export default memo(Head);
