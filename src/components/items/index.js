import React from 'react';
import "./style.css"
import { countItemDuplicates, generateUniqueKey, removeDuplicatesByCode } from "../../utils";
import Item from "../item";

function Items( {list = [], handleItemAction = ()=>{}, modeDelete = false} ) {

  return (
    <div>
      { removeDuplicatesByCode(list).map( ( item, index ) => (
        <div key={ generateUniqueKey( 8 ) } className={ "List-item" }>
          <Item item={ item } index={ index } handleItemAction={ handleItemAction } countItemDuplicates={countItemDuplicates(list, item) + " шт"} modeDelete={ modeDelete }/>
        </div>
      ) ) }
    </div>
  );


}

export default Items;
