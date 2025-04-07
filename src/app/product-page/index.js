import { memo, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Button from '../../components/button';
import useTranslate from '../../hooks/useTranslate';
import ProductDescription from '../../components/product-description';
import ProductDetails from '../../components/product-details';
import ProductPrice from '../../components/product-price';
import './style.css';

function ProductPage() {
  const t = useTranslate();
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.loadProduct(id);
    store.actions.modals.close();
  }, [id]);

  const select = useSelector(state => ({
    product: state.catalog.productPage.product,
    isLoading: state.catalog.productPage.isLoading,
    error: state.catalog.productPage.error,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(() => {
      if (select.product) { // Проверяем, что товар загружен
        store.actions.basket.addToBasket(id);
      }
    }, [store, id, select.product]),
    
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (select.isLoading) return <div>Loading...</div>;
  if (select.error) return <div>Error: {select.error}</div>;
  if (!select.product) return null;

  const details = [
    { label: t('country'), value: `${select.product.madeIn?.title} (${select.product.madeIn?.code})` },
    { label: t('category'), value: select.product.category?.title },
    { label: t('year'), value: select.product.edition || t('not_specified') },
  ];

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <div className="ProductPage">
      <ProductDescription description={select.product.description} />
        <ProductDetails details={details} />
        <ProductPrice price={`${numberFormat(select.product.price)} ₽`} label={t('price')} />
        <Button style="primary" onClick={callbacks.addToBasket} title={t('add')} />
      </div>
    </PageLayout>
  );
}

export default memo(ProductPage);