import { memo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { numberFormat } from '../../utils';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import Button from '../../components/button';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const store = useStore();
  const actions = store.actions;

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { t } = useTranslate();

  useEffect(() => {
    const load = async () => {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      const json = await response.json();
      setProduct(json.result);
      actions.catalog.addItem(json.result);
    };
    load();
  }, [id]);

  const callbacks = {
    addToBasket: () => actions.basket.addToBasket(product._id),
    openBasket: () => actions.modals.open('basket'),
  };

  if (!product) {
    return (
      <PageLayout>
        <div>{t('loading')}</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Head title={product.title} />

      <div className="Product-top">
        <Link to="/" className="Product-back">
          ← {t('home')}
        </Link>
        <BasketTool inline onOpen={callbacks.openBasket} amount={select.amount} sum={select.sum} />
      </div>

      <div className="Product">
        <p className="Product-description">{product.description || t('noDescription')}</p>

        <div className="Product-info">
          {product.madeIn?.title && (
            <div className="Product-row">
              <div className="Product-label">{t('manufacturer')}:</div>
              <div className="Product-value">
                {product.madeIn.title} ({product.madeIn.code})
              </div>
            </div>
          )}

          {product.category?.title && (
            <div className="Product-row">
              <div className="Product-label">{t('category')}:</div>
              <div className="Product-value">{product.category.title}</div>
            </div>
          )}

          {product.edition && (
            <div className="Product-row">
              <div className="Product-label">{t('year')}:</div>
              <div className="Product-value">{product.edition}</div>
            </div>
          )}
        </div>

        <div className="Product-price">
          {t('price')}: {' ' + numberFormat(product.price)} ₽
        </div>

        <Button style="primary" onClick={callbacks.addToBasket} title={t('add')} />
      </div>
    </PageLayout>
  );
}

export default memo(Product);
