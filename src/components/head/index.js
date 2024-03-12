import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Head({title}) {
  const store = useStore()
  const lang = useSelector(state => state.lang)

  const setLang = () => {
    if (lang === 'ru-RU') {
      store.setLang('en-US')
    } else store.setLang('ru-RU')
  }
  return (
    <div className='Head'>
      <button className='Head-lang-button' onClick={setLang}>{lang === 'ru-RU' ? 'RU' : 'ENG'}</button>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
