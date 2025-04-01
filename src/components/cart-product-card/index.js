import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formattedNumber } from "../../utils";
import { cn as bem } from "@bem-react/classname";

const CartProductCardDefaultProps = {
  onClickAction: () => {},
  item: {},
};

function CartProductCard( { onClickAction = CartProductCardDefaultProps.onClickAction, item = CartProductCardDefaultProps.item } ) {

  const cn = bem( "CartProductCard" );

  const onClick =  () => {
    onClickAction( item.code );
  };

  return (
    <div className={ cn() }>
      <b className={ cn( "title" ) }>{ item.title }</b>
      <span className={ cn( "count" ) }>{ item.count } шт</span>
      <span className={ cn( "price" ) }>{ formattedNumber( item.total ) } ₽</span>
      <div className={ cn( "actions" ) }>
        <button onClick={ onClick }>Удалить</button>
      </div>
    </div>
  );
}

CartProductCard.propTypes = {
  item: PropTypes.shape( {
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    total: PropTypes.number,
  } ).isRequired,
  onClickAction: PropTypes.func,
};

export default React.memo( CartProductCard );
