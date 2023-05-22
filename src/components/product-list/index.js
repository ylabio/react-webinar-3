import React from "react";
import PropTypes from 'prop-types';
import Item from "./item";
import List from "../list";

function ProductList({list, onAdd}) {
  return <List list={list} renderItem={({item}) => (
    <Item item={item} onAdd={onAdd}/>
  )}/>
}

ProductList.propTypes = {
  list: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ProductList;
