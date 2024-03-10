import React from 'react';
import List from "../../components/list";
import Pagination from "../../components/pagination";

const Shop = ({list , renderItem, pagesCount, onChangePage, currentPage}) => {
  return <>
    <List list={list} renderItem={renderItem}/>
    <Pagination pagesCount={pagesCount} onChangePage={onChangePage} currentPage={currentPage}/>
    </>
};

export default Shop;