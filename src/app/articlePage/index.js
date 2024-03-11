import { memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Article from '../../components/article'
import BasketTool from '../../components/basket-tool'
import Head from '../../components/head'
import List from '../../components/list'
import PageLayout from '../../components/page-layout'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ArticlePage() {
  const {id} = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.catalog.loadArticle(id)
  }, [])

  const select = useSelector(state => ({
    item: state.catalog.item,
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
      <Head title={select.item?.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <Article article={select.item} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(ArticlePage);
