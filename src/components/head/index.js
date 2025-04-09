import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import LanguageToggle from '../../components/language-toggle';
import useStore from '../../store/use-store';
import './style.css';

function Head({ title }) {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const callbacks = {
    // Выбор языка
    onLanguageChange: useCallback((value) => store.actions.catalog.onLanguageChange(value), [store]),
  };

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
          <LanguageToggle onLanguageChange={callbacks.onLanguageChange} />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
