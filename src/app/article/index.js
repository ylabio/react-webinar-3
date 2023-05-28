import {memo, useCallback, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import ArticleInfo from "../../components/article-info";
import {useParams} from "react-router-dom";
import RowLayout from "../../components/row-layout";
import Navigation from "../../components/navigation";
import LanguageSwitch from "../../components/language-switch";

function Article() {
  const params = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    article: state.article.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activePage: state.catalog.activePage
  }));

  useEffect(() => {
    store.actions.article.load(params.articleId);
  }, [params]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена языка
    changeLanguage: useCallback((lang) => store.actions.language.changeLanguage(lang), [store])
  }

  return (
    <PageLayout>
      <Head title={select.article.title}/>
      <RowLayout>
        <Navigation />
        <LanguageSwitch onLangChange={callbacks.changeLanguage} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </RowLayout>
      <ArticleInfo article={select.article} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(Article);
