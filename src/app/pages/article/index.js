import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ItemArticle from "../../../components/item-article";
import PageLayout from "../../../components/page-layout";
import Head from "../../../components/head";
import BasketTool from "../../../components/basket-tool";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";

function Article() {

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    store.actions.catalogItem.load(id);
  }, [id]);

  const select = useSelector(state => ({
    item: state.catalogItem.catalogItem,
    category: state.catalogItem.category,
    madeIn: state.catalogItem.madeIn,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemArticle item={select.item}
                  category={select.category}
                  madeIn={select.madeIn}
                  onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(Article);
