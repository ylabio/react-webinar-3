import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import {formatNumber} from "../../utils";
import './style.css';

function CatalogItem(props) {
  return (
    <div className='Catalog-item'>
      <div className='Catalog-item_code'>{props.item.code}</div>
      <div className='Catalog-item_title'>{props.item.title}</div>
      <span className='Catalog-item_price'>{formatNumber(props.item.price)}&nbsp;₽</span>
      <div className='Catalog-item_actions'>
        <Button onAdd={() => props.onAdd(props.item.code)} />
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default React.memo(CatalogItem);
