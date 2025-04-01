import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import RenderItem from "../item-render";

const ListDefaultProps = {
  list: [],
  onClickAction: () => {},
  isCart: false,
};

function List( {
                 list = ListDefaultProps.list,
                 onClickAction = ListDefaultProps.onClickAction,
                 isCart = ListDefaultProps.isCart,
               } ) {

  const cn = bem( 'List' );

  return (
    <ul className={ cn() }>
      { list.map( item => (
        <li key={ item.code } className={ cn( "item" ) }>
          <RenderItem item={item} isCart={isCart} onClickAction={onClickAction}/>
        </li>
      ) ) }
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape( {
      code: PropTypes.number,
    } ),
  ).isRequired,
  onClickAction: PropTypes.func.isRequired,
};

export default React.memo( List );
