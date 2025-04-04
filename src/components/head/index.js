import {memo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Head({ title }) {
  const language = useSelector(state => state.language.language);
  const store = useStore();

  const callbacks = {
    onChangeLang: useCallback((language) => {
      store.actions.language.change(language)
    }, [store]),
  }

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <select
          onChange={e => callbacks.onChangeLang(e.target.value)}
          className="Head-language"
          value={language}
        >
          <option value='ru'>Русский</option>
          <option value='en'>English</option>
        </select>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
