import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import './style.css';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Head({ title }) {

  const store = useStore();

  const { lang, allLocales, locale } = useSelector(state => ({
    lang: state.i18n.lang,
    allLocales: state.i18n.allLocales,
    locale: state.i18n.locale,
  }));

  const changeLang = useCallback((e) => store.actions.i18n.changeLocale(e.target.value), [store]);

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select value={lang} onChange={changeLang}>
        {Object.keys(allLocales).map(key =>
          <option key={key} value={key}>{allLocales[key]._Title}</option>
        )}
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
