import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { numberFormat, plural } from "../../utils";
import { rule } from "../../constants";

function Controls({ onAdd, totalPrice, itemsCount }) {

  const cn = bem('Controls');

  const text = `${itemsCount} ${plural(itemsCount, rule)} / ${numberFormat(totalPrice)}`;

  return (
    <div className={cn()}>
      <div>
        В корзине: {itemsCount ? (<b className={cn('price')}>{text}</b>) : (<b>пусто</b>)}
      </div>
      <button className={cn('btn')} onClick={() => onAdd()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  totalPrice: PropTypes.number,
  itemCount: PropTypes.number,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
