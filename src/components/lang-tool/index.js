import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css'

function LangTool({setLang, setLocale}) {
  return (
    <div className='LangTool'>
      <button onClick={() => {setLocale('ru'); setLang('ru')}}>ru</button>
      <button onClick={() => {setLocale('eng'); setLang('eng')}}>eng</button>
    </div>
  )
}

LangTool.PropTypes = {
  setLang: PropTypes.func,
  setLocale: PropTypes.func,
}

LangTool.defaultProps = {
  setLang: () => {},
  setLocale: () => {},
}

export default memo(LangTool);
