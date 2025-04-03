import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useStore from '../../store/use-store';
import useTranslate from '../../hooks/use-translate';

function Head({ title }) {
  const store = useStore();
  const actions = store.actions;
  const { currentLang } = useTranslate();

  const changeLang = e => {
    actions.lang.setLang(e.target.value);
  };

  return (
    <header className="Header">
      <h1>{title}</h1>
      <select value={currentLang} onChange={changeLang}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
    </header>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
