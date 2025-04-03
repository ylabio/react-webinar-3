import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formattedNumber } from "../../utils";
import { cn as bem } from "@bem-react/classname";

const ItemCartDefaultProps = {
  onClickAction: () => {},
  item: {},
};

function ItemCart( { item = ItemCartDefaultProps.item, onClickAction = ItemCartDefaultProps.onClickAction } ) {

  const cn = bem( "ItemCart" );

  const onClick =  () => {
    onClickAction( item._id );
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

ItemCart.propTypes = {
  item: PropTypes.shape( {
    _id: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.number,
    total: PropTypes.number,
  } ).isRequired,
  onClickAction: PropTypes.func,
};

export default React.memo( ItemCart );
