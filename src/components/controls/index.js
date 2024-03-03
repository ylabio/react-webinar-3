import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Button from "../button";
import {getCost, plural} from "../../utils"
import {cn as bem} from '@bem-react/classname';

function Controls(props) {

  const cn = bem('Controls');

  const cost = getCost(props.cart);
  const count = props.cart.length;

  const variants = {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
    others: 'товара'
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        <span>В корзине:</span>
        <span><b>{count > 0 ? `${count} ${plural(count, variants)} / ${cost} ₽` : 'пусто'}</b></span>
      </div>
      <Button title='Перейти' onClick={props.onClick} />
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.array,
  onClick: PropTypes.func
};

Controls.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(Controls);
