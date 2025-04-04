import React from "react";
import { useCallback, useEffect } from "react";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemId from "../../components/item-id";
import { useParams } from 'react-router-dom';


function Article() {
    const store = useStore();
    const { id } = useParams();
    const select = useSelector(state => ({
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
      page: state.catalog.page,
      count: state.catalog.count,
      limit: state.catalog.limit,
      data: state.article.data,
      productById: state.catalog.productById,

    }));

    useEffect(() => {
      store.actions.article.loadById(id);
    },[id] );

    const callbacks = {
      addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(
            () => store.actions.modals.open('basket'),
            []),    }

return (
 <PageLayout>
  <Head title={select.data.title} />
  <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
  <ItemId item={select.data} onAdd={callbacks.addToBasket} />
</PageLayout>
)
}

export default Article;
