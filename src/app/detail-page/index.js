import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDetail from '../../components/item-detail';
import Breadcrumbs from '../../components/breadcrumbs';
import FlexGroup from '../../components/flex-group';

function DetailPage() {
  const id = useParams().id;
  
  const store = useStore();

  useEffect(() => {
    store.actions.modals.close();
    store.actions.detail.load(id);
  }, [id]);

  const select = useSelector(state => ({
    productDetail: state.detail.productDetail,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    getPhrase: useCallback((phraseGroup, phraseCode, phraseDefault) => 
      store.actions.lang.getPhrase(phraseGroup, phraseCode, phraseDefault), [store]),
  }

  return (
    <PageLayout>
      <Head title={ select.productDetail.title } />
      <FlexGroup>
        <Breadcrumbs getPhrase={ callbacks.getPhrase } />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} getPhrase={ callbacks.getPhrase }  />
      </FlexGroup>
      <ItemDetail item={select.productDetail} onAdd={callbacks.addToBasket} getPhrase={ callbacks.getPhrase } />
    </PageLayout>

  );
}

export default memo(DetailPage);
