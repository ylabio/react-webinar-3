import React from 'react';
import List from "../../components/list";
import Pagination from "../../components/pagination";

const Shop = ({list , renderItem, pagesCount, callbacks, currentPage}) => {
  return <>
    <List list={list} renderItem={renderItem}/>
    <Pagination pagesCount={pagesCount} onChangePage={callbacks.onChangePage} currentPage={currentPage}/>
    </>
};

export default Shop;