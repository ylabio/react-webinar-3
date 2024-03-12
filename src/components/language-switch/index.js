import React from 'react'
import './style.css';
import propTypes from 'prop-types';
import { content } from '../../store/translation/content';


function LangSwitcher(props) {


  return (
    <div className='LangSwitcher'>
      <button lang-key='lang' onClick={props.switchLang}>{content[props.lang].lang}</button>
    </div>
  )
}

export default React.memo(LangSwitcher)


  // const[lang, setLang] = useState('ru')
  // const toggleLang = () => {
  //   setLang(lang === 'ru' ? 'en' : 'ru')
  // }