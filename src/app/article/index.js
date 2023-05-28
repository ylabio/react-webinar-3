import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ArticleInfo from '../../components/article-info';
import Nav from '../../components/nav';
import ContainerSpaceBetween from '../../components/container-space-between';
import Spinner from '../../components/spinner';

function Article() {
  const store = useStore();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const _id = params._id;

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article.article,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  };

  useEffect(() => {
    setLoading(true);
    store.actions.article.loadArticle(_id).then(() => {
      setLoading(false);
    });
  }, [_id]);

  return (
    <PageLayout>
      <Head title={!loading && select.article.title} />
      <ContainerSpaceBetween>
        <Nav />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          btn='large'
        />
      </ContainerSpaceBetween>
      {loading ? (
        <Spinner />
      ) : (
        <ArticleInfo
          article={{ ...select.article }}
          onAdd={callbacks.addToBasket}
        />
      )}
    </PageLayout>
  );
}

export default memo(Article);
