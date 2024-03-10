import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { langText } from '../../constants/language';

function Head({ title }) {
  const store = useStore();
  const language = useSelector(state => state.catalog.language);

  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className='Head-btns'>
        <button
          disabled={language === 'ru'}
          onClick={() => {
            store.actions.catalog.setLanguage('ru');
          }}
        >
          {langText.LANGUAGE[language][0]}
        </button>
        <button
          disabled={language === 'en'}
          onClick={() => {
            store.actions.catalog.setLanguage('en');
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
};

export default memo(Head);
