import React from "react";
import { cn as bem } from '@bem-react/classname'
import "./style.css";
import * as PropTypes from "prop-types";
import { formatPrice, isEven } from "../../utils";

const itemClass = bem( "Item" );

function Item( { item, index, addItem, modeDelete } ) {
  return (
    <div
      className={ "Item" + ( isEven( index ) ? ' Item_selected' : '' ) }
    >
      <div className={ itemClass( "code" ) }/>
      <div className={ itemClass( "title" ) }>
        { item.title }
        <div>{ formatPrice( item.price ) + " ₽" }</div>
      </div>
      <div className={ modeDelete ? "Modal-actions" :  itemClass( "actions" ) }>
        <button onClick={ ( event ) => {
          addItem( item.code );
          event.stopPropagation();
        } }>{modeDelete ? "Удалить" : "Добавить" }
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape( {
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    selected: PropTypes.bool,
  } ).isRequired,
};


export default React.memo( Item )
