import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import { formattedNumber } from "../../utils";

const ItemDefaultProps = {
  onClickAction: () => {},
  item: {},
};

function Item( { item = ItemDefaultProps.item, onClickAction = ItemDefaultProps.onClickAction } ) {

  const cn = bem( "Item" );

  const onClick = () => {
    onClickAction(item._id);
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
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  } ).isRequired,
  onClickAction: PropTypes.func,
};


export default React.memo( Item );
