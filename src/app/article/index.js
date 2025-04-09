import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router';
import Nav from '../../components/nav';
import ArticleCard from '../../components/article-card';
import Basket from '../basket';
import { useTranslation } from '../../translation/translation-context';

function Article() {
  const store = useStore();
  const { t } = useTranslation();
  const { articleId } = useParams();

  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    store.actions.catalog.loadArticle(articleId);
  }, [articleId, store]);

  const article = useSelector(state => state.catalog.activeArticle);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (!article) return <div>Загрузка...</div>;

  return (
    <PageLayout>
      <Head title={article.title} />
      <Nav homeText={t('navItemMain')}>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          amountText={{
            one: `${t('productOne')}`,
            few: `${t('productSome')}`,
            many: `${t('productMany')}`,
            empty: `${t('emptyCart')}`,
          }}
          sum={select.sum}
        />
      </Nav>
      <ArticleCard
        article={article}
        country={article.madeIn.title}
        category={article.category.title}
        onAdd={callbacks.addToBasket}
        text={{
          price: t('price'),
          country: t('country'),
          category: t('category'),
          edition: t('edition'),
          button: t('addToCart'),
        }}
      />
      {activeModal === 'basket' && <Basket />}
    </PageLayout>
  );
}

export default memo(Article);
