import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formattedNumber } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

const ItemCartDefaultProps = {
  onClickAction: () => {},
  item: {},
};

function ItemCart( { item = ItemCartDefaultProps.item, onClickAction = ItemCartDefaultProps.onClickAction, articleService } ) {

  const cn = bem( "ItemCart" );

  const onClick =  () => {
    onClickAction( item._id );
    articleService
  };


  return (
    <div className={ cn() }>
      <Link className={cn("title")} to={`/product/${item._id}`}>
        <b >{item.title}</b>
      </Link>
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
