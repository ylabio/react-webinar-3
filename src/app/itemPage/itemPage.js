import { memo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import { useEffect } from "react";
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router";
import ItemDetails from "../../components/item-details/item-details";
import LayoutWithCommonElements from "../../components/LayoutWithCommonElements/LayoutWithCommonElements";
import { useCallback } from "react";

function ItemPage() {
    const { itemId } = useParams();
    const store = useStore();
    const select = useSelector(state => ({
        currentItem: state.catalog.currentItem,
    }));
    const cn = bem('Item');
    useEffect(() => {
        async function fetchData() {
            store.actions.catalog.resetCurrentItem();

            await store.actions.catalog.loadById(itemId);
        }
        fetchData();
    }, [itemId, store.actions.catalog]);
    const addToBasket = useCallback(_id => {
        console.log('Добавляем в корзину товар с ID:', _id);
        store.actions.basket.addToBasket(_id);
    }, [store]);
    if (!select.currentItem) {
        return <div>Loading...</div>;
    }
    return (
        <LayoutWithCommonElements titleKey={select.currentItem.title}>
            <ItemDetails item={select.currentItem} onAdd={addToBasket} />
        </LayoutWithCommonElements>
    );
}





export default memo(ItemPage);
