import { memo, useEffect, useCallback, useMemo } from "react";
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ArticleInfo from "../../components/article-info";
import Loading from "../../components/loading";

function ArticlePage() {

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.article.clearArticle();
    store.actions.article.fetchArticle(id);
  }, [id]);

  useEffect(() => {
    return () => {
      store.actions.article.clearArticle();
    }
  }, []);

  const select = useSelector(state => ({
    item: state.article?.item,
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const articleUiElements = useMemo(() => {
    return {
      addButton: select.uiElements.basketAdd[select.currentLanguage],
      country: select.uiElements.basketCountry[select.currentLanguage],
      category: select.uiElements.basketCategory[select.currentLanguage],
      year: select.uiElements.basketYear[select.currentLanguage],
      price: select.uiElements.itemPrice[select.currentLanguage],
    }
  }, [select.currentLanguage, select.uiElements]);
    
  const getLoadingText = useCallback(() => {
    return select.uiElements.loadingText[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  const onAddToCart = useCallback(() => {
    store.actions.basket.addToBasket(select.item._id);
  }, [store, select]);

  return (
    <Loading isLoading={select.item === undefined} text={getLoadingText()}>
      <ArticleInfo 
        item={select.item} 
        onAddToCart={onAddToCart}
        uiElements={articleUiElements}
      />
    </Loading>
  )
    
}

export default memo(ArticlePage);
