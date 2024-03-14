import { memo, useEffect, useCallback } from "react";
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
  }));

  const onAddToCart = useCallback(() => {
    store.actions.basket.addToBasket(select.item._id);
  }, [store, select]);

  return (
    <Loading isLoading={select.item === undefined}>
      <ArticleInfo item={select.item} onAddToCart={onAddToCart} />
    </Loading>
  )
    
}

export default memo(ArticlePage);
