import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import './style.css';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Head({ title }) {

  const store = useStore();

  const { lang, languageNames } = useSelector(state => ({
    lang: state.i18n.lang,
    languageNames: state.i18n.languageNames,
  }));

  const changeLang = useCallback((e) => store.actions.i18n.changeLocale(e.target.value), [store]);

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select value={lang} onChange={changeLang}>
        {Object.keys(languageNames).map(key =>
          <option key={key} value={key}>{languageNames[key]}</option>
        )}
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
