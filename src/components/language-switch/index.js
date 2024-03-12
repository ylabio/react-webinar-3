import React from 'react'
import './style.css';
import PropTypes from 'prop-types';
import { content } from '../../store/translation/content';


function LangSwitcher(props) {
  return (
    <div className='LangSwitcher'>
      <button onClick={props.switchLang}>{content[props.lang].lang}</button>
    </div>
  )
}

LangSwitcher.propTypes = {
  switchLang: PropTypes.func,
  lang: PropTypes.string,
}

LangSwitcher.defaultProps = {
  switchLang: () => {},
  lang: 'ru',
}

export default React.memo(LangSwitcher)