import React, {useEffect, useCallback, memo} from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ItemProduct from '../../components/item-product';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { useParams } from 'react-router-dom';


const Product = () => {
    const store = useStore();
    const { id } = useParams();

   
      const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      }

 


    return (
        <PageLayout>
            <Head title='Название товара' />
            <BasketTool  />
            <ItemProduct />
        </PageLayout>
    );
};

export default memo(Product);