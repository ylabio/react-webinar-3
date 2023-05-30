import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticleAbout from "../../components/article-about";
import Layout from '../layout';
import {  useTranslate } from '../../language/lang-conext';


function Article() {
  const params = useParams();
  const store = useStore();
  const t= useTranslate();
  const select = useSelector((state) => ({
    article: state.catalog.article,
  
  }));


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store] ),
  };

  useEffect(() => {store.actions.catalog.loadArticle(params.id);}, [params.id]);

  return (
    <Layout title={select.article.title||""}>
       <ArticleAbout article={select.article} onAdd={callbacks.addToBasket} 
       texts={{
        country: t("article.country"),
        year: t("article.year"), 
        price: t("article.price"), 
        add: t("links.add")}}/>
    </Layout>
    
  );
}

export default memo(Article);
