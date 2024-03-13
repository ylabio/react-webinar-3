import { memo } from 'react'
import PropTypes from "prop-types";
import './style.css';

function SwitchLang({lang, changeLang}) {
  const onChangeSwitch = () => {
    if (lang === 'en') {
      changeLang('ru')
    } else {
      changeLang('en')
    }


  }

  return (
    <div className='container'>
      <span>RU</span>
      <label className='Switch'>
        <input type='checkbox' onChange={onChangeSwitch} defaultChecked={lang === 'en'}/>
        <span className='slider round'></span>
      </label>
      <span>EN</span>
    </div>
  )
}

SwitchLang.propTypes = {
  title: PropTypes.node,
};

export default memo(SwitchLang);
