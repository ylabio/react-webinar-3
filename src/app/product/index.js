import { memo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useTranslate from '../../hooks/use-translate';
import BasketTool from '../../components/basket-tool';
import './style.css';
import useSelector from '../../store/use-selector';

function Product() {
  const { id } = useParams();
  const store = useStore();
  const { t } = useTranslate();
  const [product, setProduct] = useState(null);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  useEffect(() => {
    void fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`) // подробные поля
      .then(res => res.json())
      .then(json => {
        setProduct(json.result);
        store.actions.catalog.addItem(json.result);
        store.actions.ui.setTitle(json.result.title);
      });
  }, [id, store.actions.catalog, store.actions.ui]);

  if (!product) return null;

  return (
    <PageLayout>
      <div className="Product-top">
        <Link to="/" className="Product-back">
          ← {t('home')}
        </Link>
        <BasketTool
          inline
          onOpen={() => store.actions.modals.open('basket')}
          amount={select.amount}
          sum={select.sum}
        />
      </div>

      <div className="Product">
        {/*<h1 className="Product-title">{product.title}</h1>*/}

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
          {t('price')}: {' ' + product.price} ₽
        </div>

        <button
          className="Product-button"
          onClick={() => store.actions.basket.addToBasket(product._id)}
        >
          {t('add')}
        </button>
      </div>
    </PageLayout>
  );
}

export default memo(Product);
