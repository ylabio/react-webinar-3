import React, { memo, useCallback, useEffect } from "react";
import Head from "../head";
import useSelector from '../../store/use-selector';
import BasketTool from "../basket-tool";
import useStore from '../../store/use-store';
import { useParams } from 'react-router-dom';
import Button from '../button';
import { numberFormat } from '../../utils';
import { useLanguage } from '../../language-context';
import translations from '../../locales';
import './style.css';
import HomeLink from "../home-link";

function ProductPage() {
  const { id } = useParams();
  const store = useStore();
  const { language } = useLanguage();
  const t = translations[language];

  const select = useSelector(state => ({
    product: state.product.current,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.product.loadProduct(id);
    return () => store.actions.product.clearProduct();
  }, [id, store]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  };

  return(
    <div className="product-page">
      <Head title={select.product?.title || 'Товар'}/>
      <div className="header-container">
        <div className="header-content">
        <HomeLink/>
          <div className="basket-tool-wrapper">
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
          </div>
        </div>
      </div>

      <div className="product-details">
        <div className="product-info">
          <div className="product-description">
            <a>{select.product?.description || 'Нет описания'}</a>
          </div>
          <div className="product-country">
            <span>Страна производителя: </span> <b>{select.product?.madeIn?.title || 'Не указана'}</b>
          </div>
          <div className="product-category">
            <span>Категория:</span> <b>{select.product?.category?.title || 'Не указана'}</b>
          </div>
          <div className="product-year">
            <span>Год выпуска:</span> <b>{select.product?.year || 'Не указан'}</b>
          </div>
          <div className="product-price">
            <span><b>Цена: </b></span><b>{numberFormat(select.product?.price)} ₽</b>
          </div>
        </div>
        {select.product && (
          <Button
            style="primary"
            onClick={() => callbacks.addToBasket(select.product._id)}
            title={t.addToCart}
          />
        )}
      </div>
    </div>
  )
}

export default memo(ProductPage);
