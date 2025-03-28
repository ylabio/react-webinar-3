import React from "react";
import { cn as bem } from '@bem-react/classname'
import "./style.css";
import Item from "../item";
import * as PropTypes from "prop-types";

const listClass = bem( "List" );

function List( { list, addItem } ) {
  return (
    <div className={ listClass() }>
      { list.map( ( item, index ) => (
        <div key={ item.code } className={ listClass( "item" ) }>
          <Item item={ item } index={ index } addItem={ addItem } modeDelete={false}/>
        </div>
      ) ) }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf( PropTypes.shape( {
    code: PropTypes.number,
  } ) ).isRequired,
};


export default React.memo( List )
