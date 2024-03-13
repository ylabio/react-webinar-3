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
import Spinner from "../../components/spiner";

function ItemPage() {
    const { itemId } = useParams();
    
    const store = useStore();
    const select = useSelector(state => ({
        currentItem: state.catalog.currentItem,
        isLoading: state.catalog.isLoading
    }));
    const cn = bem('Item');
    useEffect(() => {
        async function fetchData() {
            store.actions.catalog.resetCurrentItem();

            await store.actions.catalog.loadById(itemId);
        }
        fetchData();
    }, [itemId]);
    const addToBasket = useCallback(_id => {
        console.log('Добавляем в корзину товар с ID:', _id);
        store.actions.basket.addToBasket(_id);
    }, [store]);
    const getTitleKey = () =>
        select.isLoading || !select.currentItem ? 'shop' : select.currentItem.title;
  
    return (
        <LayoutWithCommonElements titleKey={getTitleKey()}>
            {select.isLoading ? (
                <Spinner />
            ) : (
                <ItemDetails item={select.currentItem} onAdd={addToBasket} />
            )}
        </LayoutWithCommonElements>
    );
}





export default memo(ItemPage);
