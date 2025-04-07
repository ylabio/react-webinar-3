import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import useTranslate from '../../hooks/useTranslate';
import Cart from '../../assets/icon/cart.svg';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;
  const t = useTranslate();
  const store = useStore();
  const lang = useSelector(state => state.locale.lang);
  const cn = bem('BasketTool');
  
  //сброс страницы при переходе на главную
  const handleHomeClick = () => {
    store.actions.catalog.setPage(1); // сброс на первую страницу
  };

  return (
    <div className={cn()}>
      <Link to="/" 
        className={cn('home-link')} 
        onClick={handleHomeClick}>
        {t('home')}
      </Link>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, t('items'), lang === 'ru' ? 'ru-RU' : 'en-US')} / ${numberFormat(sum)} ₽`
            : t('empty')}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
