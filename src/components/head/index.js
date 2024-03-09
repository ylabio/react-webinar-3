import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { lang } from "../../data/lang";
import './style.css';

function Head({title}) {
  const store = useStore();

  const select = useSelector(state => ({
    lang: state.lang.lang,
  }))

  const toggleLang = useCallback(() => store.actions.lang.toggleLang(), [store]);

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button className="Head-lang" onClick={toggleLang}>{lang[select.lang].language}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
