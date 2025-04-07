import { memo } from 'react';
import { Link } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import PropTypes from 'prop-types';
import './style.css';

function MainMenu({ onOpenBasket, amount, sum }) {
  return (
    <div className="navigation">
      <Link className="link" to={'/'}>
        Главная
      </Link>
      <BasketTool onOpen={onOpenBasket} amount={amount} sum={sum} />
    </div>
  );
}

export default memo(MainMenu);
