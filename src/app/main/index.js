import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination/pagination';
import LayoutWithCommonElements from '../../components/LayoutWithCommonElements/LayoutWithCommonElements';
import Spinner from "../../components/spiner";
import usePagination from '../../store/usePagination';

function Main() {
    const store = useStore();
    const select = useSelector(state => ({
        list: state.catalog.list,
        currentPage: state.catalog.currentPage,
        lastPage: state.catalog.lastPage,
        isLoading:state.catalog.isLoading
    }));
    const { goToPage } = usePagination(10, store.actions.catalog);
    useEffect(() => {
        store.actions.catalog.resetCurrentItem();
    }, []);
    const addToBasket = useCallback(_id => {
        store.actions.basket.addToBasket(_id);
    }, [store]);
    const renderItem = useCallback((item) => {
        return <Item item={item} onAdd={addToBasket} />
    }, [addToBasket]);
    if (select.isLoading) {
        return <Spinner />;
    }
    return (
        <LayoutWithCommonElements titleKey='shop'>
            <List list={select.list} renderItem={renderItem} />
            <Pagination currentPage={select.currentPage} lastPage={select.lastPage} goToPage={goToPage} />
        </LayoutWithCommonElements>
    );
}



export default memo(Main);
