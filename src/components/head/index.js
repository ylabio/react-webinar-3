import { memo } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Button from '../button';
import './style.css';

function Head({ title }) {
  const store = useStore();
  const lang = useSelector(state => state.locale.lang);

  const callbacks = {
    changeLang: () => {
      const newLang = lang === 'ru' ? 'en' : 'ru';
      store.actions.locale.setLang(newLang);
    }
  };

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <Button 
          style="outline" 
          onClick={callbacks.changeLang} 
          title={lang === 'ru' ? 'En' : 'Ru'}
        />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
