import { memo, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Button from '../../components/button';
import './style.css';

function ProductPage() {
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
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store, id]),
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
            <span>Страна производитель: </span>
            <strong>{select.product.madeIn?.title} ({select.product.madeIn?.code})</strong>
          </div>
          <div className="ProductPage-detail">
            <span>Категория: </span>
            <strong>{select.product.category?.title}</strong>
          </div>
          <div className="ProductPage-detail">
            <span>Год выпуска: </span>
            <strong>{select.product.edition ||'Не указан'}</strong>
          </div>
        </div>
        
        <div className="ProductPage-price">
          <span>Цена: </span>
          <strong>{numberFormat(select.product.price)} ₽</strong>
        </div>
        
        <Button style="primary" onClick={callbacks.addToBasket} title="Добавить" />
      </div>
    </PageLayout>
  );
}

export default memo(ProductPage);