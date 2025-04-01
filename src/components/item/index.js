import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import { formattedNumber } from "../../utils";

const ItemDefaultProps = {
  onClickAction: () => {},
  item: {},
};

function Item( { onClickAction = ItemDefaultProps.onClickAction, item = ItemDefaultProps.item } ) {

  const cn = bem( "Item" );

  const onClick = () => {
      onClickAction( item.code );
    };

  return (
    <div className={ cn() }>
      <b className={ cn( "title" ) }>{ item.title }</b>
      <span className={ cn( "price" ) }>{ formattedNumber( item.price ) } ₽</span>
      <div className={ cn( "actions" ) }>
        <button onClick={ onClick }>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape( {
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  } ).isRequired,
  onClickAction: PropTypes.func,
};


export default React.memo( Item );
