import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import Article from '../../components/article';

function SingleArticle() {

  const store = useStore();
  const articleIdObject = useParams();
  const articleId = articleIdObject.articleId;

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.article.loadOne(articleId);
  }, [articleIdObject]);

  const language = useSelector(state => ({
    language: state.language.language,
    headTextRu: {...state.language.ru.head, ...state.language.ru.values},
    headTextEn: {...state.language.en.head, ...state.language.en.values},
    articleTextRu: {...state.language.ru.itemPage, ...state.language.ru.values},
    articleTextEn: {...state.language.en.itemPage, ...state.language.en.values},
  }));

  const articleText = language.language === "ru" ? language.articleTextRu : language.articleTextEn;
  const headText = language.language === "ru" ? language.headTextRu : language.headTextEn;

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const information = useSelector(state => ({
    item: state.article.item
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(articleId=> store.actions.basket.addToBasket(articleId), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={information.item.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} basketToolText={headText}/>
      <Article articleId={articleId} item={information.item} onAdd={callbacks.addToBasket} articleText={articleText}/>
    </PageLayout>

  );
}

export default memo(SingleArticle);
