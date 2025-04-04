import { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { Link } from 'react-router-dom';
import LanguageContext from '../language-provider';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const { language, translations } = useContext(LanguageContext);

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to="/">
        <h3 className="home-btn">{translations[language].navTitle}</h3>
      </Link>
      
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translations[language].cartItems)} / ${numberFormat(sum)} ₽`
          : translations[language].empty
        }
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
