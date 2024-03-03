import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from "../../utils";
import Button from '../button/index'
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
	const cn = bem('Item');

  const callbacks = {
    requiredCallback: () => {
      props.requiredCallback(props.item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
	  		<div className={cn('price')}>{formatPrice(props.item.price)} ₽</div>
				{props.isCartOpen &&
		  		<div className={cn('count')}>
        		{props.item.count} шт
          </div>
				}
        <Button callback={callbacks.requiredCallback} title={props.btnName} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
  	code: PropTypes.number,
  	title: PropTypes.string,
		price: PropTypes.number,
		count: PropTypes.number,
  }).isRequired,
  requiredCallback: PropTypes.func.isRequired,
  btnName: PropTypes.string.isRequired,
  isCartOpen: PropTypes.bool,
};

Item.defaultProps = {
	requiredCallback: () => {
  },
}

export default React.memo(Item);