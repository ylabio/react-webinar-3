import { memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Article from '../../components/article'
import BasketTool from '../../components/basket-tool'
import Head from '../../components/head'
import Header from '../../components/header'
import Navigation from '../../components/navigation'
import PageLayout from '../../components/page-layout'
import { useTranslate } from '../../hooks/useTranslate'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ArticlePage() {
  const {id} = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    item: state.article.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
    currentPage: state.catalog.currentPage,
  }));

  useEffect(() => {
    store.actions.article.load(id, select.language)
  }, [select.language])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLanguage: useCallback(lang => store.actions.language.changeLang(lang), [store])
  }

  useTranslate([select.item], select.language)

  if (!select.item.title) {
    return ;
  }
  return (
    <PageLayout>
      <Head title={select.item.title} lang={select.language} changeLang={callbacks.changeLanguage}/>
      <Header>
        <Navigation link={'/'} title={'Главная'} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} lang={select.language}/>
      </Header>
      <Article article={select.item} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(ArticlePage);
