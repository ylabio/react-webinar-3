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
    product: state.catalog.currentProduct,
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

  if (!select.product) return null;

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <div className="ProductPage">
        <div className="ProductPage-description">
          <p>{select.product.description}</p>
        </div>
        
        <div className="ProductPage-details">
          <div className="ProductPage-detail">
            <span>{t('country')}: </span>
            <strong>{select.product.madeIn?.title} ({select.product.madeIn?.code})</strong>
          </div>
          <div className="ProductPage-detail">
            <span>{t('category')}: </span>
            <strong>{select.product.category?.title}</strong>
          </div>
          <div className="ProductPage-detail">
            <span>{t('year')}: </span>
            <strong>{select.product.edition ||t('not_specified')}</strong>
          </div>
        </div>
        
        <div className="ProductPage-price">
          <span>{t('price')}: </span>
          <strong>{numberFormat(select.product.price)} ₽</strong>
        </div>
        
        <Button style="primary" onClick={callbacks.addToBasket} title={t('add')} />
      </div>
    </PageLayout>
  );
}

export default memo(ProductPage);