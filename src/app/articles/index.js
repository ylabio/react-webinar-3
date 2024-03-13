import React, { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useCallback } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import FlexContainer from "../../components/flex-container";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import LoadErrorComponent from "../../components/load-error-component";
import ArticlesInfo from "../../components/articles-info";
import Spinner from "../../components/spinner";

function Articles() {
  const { id } = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    articles: state.articles.data,
    isLoading: state.articles.isLoading,
    error: state.articles.error,
    data: state.translate.data,
    lang: state.translate.lang,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    handlerChange: useCallback(
      (lang) => {
        store.actions.translate.setLang(lang);
      },
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  useEffect(() => {
    store.actions.articles.loadArticle(id);
    return () => {
      store.actions.articles.clearArticles();
    };
  }, [id]);

  return (
    <PageLayout>
      <Head
        title={select.articles ? select.articles.title : ""}
        lang={select.lang}
        callback={callbacks.handlerChange}
      />

      <FlexContainer justify="space-between" p="20px">
        <Menu link={"/"} textLink={select.data.main.linkHome} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          lang={select.lang}
          data={select.data}
        />
      </FlexContainer>

      <LoadErrorComponent
        isLoading={select.isLoading}
        error={select.error}
        loader={<Spinner />}
      >
        {select.articles ? (
          <ArticlesInfo
            articles={select.articles}
            textBtn={select.data.main.addBtn}
            dataTranslate={select.data.productPage}
            action={() => callbacks.addToBasket(select.articles._id)}
          />
        ) : (
          ""
        )}
      </LoadErrorComponent>
    </PageLayout>
  );
}

export default memo(Articles);
