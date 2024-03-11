import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Article from '../../components/article';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader';

function Articles() {

  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    //callbacks.closeModalBasket();
    store.actions.catalog.getItems();
    store.actions.item.getItemDetails(id);
  }, [id]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    listOfDetails: state.item.itemDetails,
    isLoading: state.catalog.isLoading,
  }));

  const callbacks = {
    // Открытие, закрытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModalBasket: useCallback(() => store.actions.modals.close(),[store]),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Loader isLoading={select.isLoading}>
        <Head title={select.listOfDetails.title}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}/>
        <Article details={select.listOfDetails} onAdd={callbacks.addToBasket}/>
      </Loader>
    </PageLayout>
  );
}

export default memo(Articles);
