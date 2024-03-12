import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useStore from '../../store/use-store';
import { langText } from '../../constants/language';

function Head({ title, language="ru" }) {
  const store = useStore();

  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className='Head-btns'>
        <button
          disabled={language === 'ru'}
          onClick={() => {
            store.actions.translation.setLanguage('ru');
          }}
        >
          {langText.LANGUAGE[language][0]}
        </button>
        <button
          disabled={language === 'en'}
          onClick={() => {
            store.actions.translation.setLanguage('en');
          }}
        >
          En
        </button>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string
};

export default memo(Head);
