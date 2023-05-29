import {useEffect, useCallback, memo} from 'react';
import {useLocation} from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from "../../components/basket-tool";
import DetailsPage from '../../components/details-page';
import ContentLayout from "../../components/content-layout";

function Details() {
  const location = useLocation();
  const {itemId} = location.state;
  
  const store = useStore();

  const select = useSelector(state => ({
    list: state.details.list,
    sum: state.basket.sum,
    amount: state.basket.amount,
  }));
  
  useEffect(() => {
    store.actions.details.loadItem(itemId);
    store.actions.catalog.load();
  }, [itemId])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <>
      <PageLayout>
        <Head title={select.list.title}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        <ContentLayout>
          <DetailsPage select={select.list} onAdd={callbacks.addToBasket}/>
        </ContentLayout>
      </PageLayout>
    </>
  );
}

export default memo(Details);