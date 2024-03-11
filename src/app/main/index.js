import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination/pagination';
import LayoutWithCommonElements from '../../components/LayoutWithCommonElements/LayoutWithCommonElements';

function Main() {
    const select = useSelector(state => ({
        list: state.catalog.list,
    }));
    const store = useStore();
    const addToBasket = useCallback(_id => {
        console.log('Добавляем в корзину товар с ID:', _id);
        store.actions.basket.addToBasket(_id);
    }, [store]);
    const renderItem = useCallback((item) => {
        return <Item item={item} onAdd={addToBasket} />
    }, [addToBasket]);

    return (
        <LayoutWithCommonElements titleKey='shop'>
            <List list={select.list} renderItem={renderItem} />
            <Pagination limit={10} />
        </LayoutWithCommonElements>
    );
}



export default memo(Main);
