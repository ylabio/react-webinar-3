import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useStore from '../../store/use-store';
import store from '../../store';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../store/use-selector';

function Head({ title }) {
  const store = useStore();
  const select = useSelector(state => ({
    lang: state.catalog.lang,
  }));
  const cn = bem('Head');

  const  onClickRu = () => {
    store.actions.catalog.setLang('ru');
  };

  const  onClickEn = () => {
    store.actions.catalog.setLang('en');
  };

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <h1>{title}</h1>
        <div>
          <button className={cn('lang', { 'active': select.lang === 'ru' })} onClick={onClickRu}>
            Ru
          </button>
          <span> / </span>
          <button className={cn('lang', { 'active': select.lang === 'en' })} onClick={onClickEn}>
            En
          </button>
        </div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
