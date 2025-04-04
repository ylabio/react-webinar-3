import {memo, useCallback, useEffect} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {Link, useParams} from "react-router";
import ControlsPanel from "../../components/controls-panel";

function Article() {
  const store = useStore();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    store.actions.article.load(id);
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.article.article.title}/>
      <ControlsPanel>
        <Link to={{pathname: "/"}}>Главная</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </ControlsPanel>

      <p>name  <b>{select.article.article.name}</b></p>
      <p>title  <b>{select.article.article.title}</b></p>
      <p>description  <b>{select.article.article.description}</b></p>
      <p>price  <b>{select.article.article.price}</b></p>
      <p>edition  <b>{select.article.article.edition}</b></p>
      <p>madeIn.title + madeIn.code  <b>{select.article.article.madeIn?.title}</b> <b>{select.article.article.madeIn?.code}</b></p>
      <p>category.title  <b>{select.article.article.category?.title}</b></p>

    </PageLayout>
  );
}

export default memo(Article);
