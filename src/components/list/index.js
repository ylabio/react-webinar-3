import React from "react";
import { cn as bem } from '@bem-react/classname'
import "./style.css";
import * as PropTypes from "prop-types";
import Items from "../items";
const listClass = bem( "List" );

function List( { list, handleItemAction } ) {



  return (
    <div className={ listClass() }>
      <div className={ listClass() }>
        <Items list={ list } handleItemAction={handleItemAction} modeDelete={false} />
      </div>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf( PropTypes.shape( {
    code: PropTypes.number,
  } ) ).isRequired,
};


export default React.memo( List )
