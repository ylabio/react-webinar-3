import React from "react";
import { cn as bem } from '@bem-react/classname'
import "./style.css";
import * as PropTypes from "prop-types";
import { pluralizeRaz } from "../../utils";

const itemClass = bem( "Item" );

function Item( { item, onDeleteItem, handleItemClick } ) {
  console.log(3)
  return (
    <div
      className={ "Item" + ( item.selected ? ' Item_selected' : '' ) }
      onClick={ ( event ) => handleItemClick( event ) }
    >
      <div className={ itemClass( "code" ) }>{ item.code }</div>
      { renderTitleWithSelectionInfo( item, pluralizeRaz ) }
      <div className={ itemClass( "actions" ) }>
        <button onClick={ ( event ) => {
          event.stopPropagation();
          onDeleteItem()
        } }>Удалить
        </button>
      </div>
    </div>
  );
}

function renderTitleWithSelectionInfo( item, pluralize ) {
  return (
    <div className={ itemClass( "title" ) }>
      { item.title }
      { item.selectionCount > 0 && (
        <div className={ itemClass( "info" ) }> &nbsp;| Выделяли { pluralize( item.selectionCount ) } </div>
      ) }
    </div>
  );
}



Item.propTypes = {
  item: PropTypes.shape( {
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  } ).isRequired,
  onDeleteItem: PropTypes.func,
  handleItemClick: PropTypes.func,
};

Item.defaultProps = {
  onDeleteItem: () => {},
  handleItemClick: () => {},
};

export default React.memo( Item )
