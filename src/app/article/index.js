import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useLoaderData } from 'react-router';
import Nav from '../../components/nav';
import ArticleCard from '../../components/article-card';
import { useTranslation } from '../../translation/TranslationContext';
import Basket from '../basket';

function Article() {
  const [country, setCountry] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const store = useStore();
  const { t } = useTranslation();

  let { result: article } = useLoaderData();

  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const countryResponse = await fetch(`/api/v1/countries/${article.madeIn._id}`);
        const countryData = await countryResponse.json();
        setCountry(`${countryData.result.title} (${countryData.result.code})`);

        const categoryResponse = await fetch(`/api/v1/categories/${article.category._id}`);
        const categoryData = await categoryResponse.json();
        setCategory(categoryData.result.title);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [article.madeIn._id, article.category._id]);

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

  return (
    <PageLayout>
      <Head title={article.title} />
      <Nav>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </Nav>
      {loading ? (
        <div>{t('dataLoading')}</div>
      ) : (
        <ArticleCard
          article={article}
          country={country}
          category={category}
          onAdd={callbacks.addToBasket}
        />
      )}
      {activeModal === 'basket' && <Basket />}
    </PageLayout>
  );
}

export default memo(Article);
