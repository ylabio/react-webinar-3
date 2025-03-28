import React from "react";
import { cn as bem } from '@bem-react/classname'
import "./style.css";
import Item from "../item";
import * as PropTypes from "prop-types";

const listClass = bem( "List" );

function List( { list, onDeleteItem, handleItemClick } ) {
  console.log(4)
  return (
    <div className={listClass()}>
      { list.map( item => (
        <div key={ item.code } className={listClass("item")}>
          <Item item={item} onDeleteItem={()=>{ onDeleteItem( item.code )}}
                handleItemClick={(event)=>{handleItemClick( event, item.code )}}/>
        </div>
      ) ) }
    </div>
  )
}
List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
  })).isRequired,
  onDeleteItem: PropTypes.func,
  handleItemClick: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  handleItemClick: () => {},
};

export default React.memo(List)
