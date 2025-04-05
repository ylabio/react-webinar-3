import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
// import { numberFormat, plural } from '../../utils';
// import Cart from '../../assets/icon/cart.svg';
import './style.css';
import { Link } from 'react-router';
import BasketTool from '../basket-tool';

function ProductTool({ onOpen, sum, amount }) {
  const cn = bem('ProductTool');
  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('homelink')}>Главная</Link>
      <BasketTool onOpen={onOpen} sum={sum} amount={amount} />
    </div>
  );
}

ProductTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(ProductTool);
