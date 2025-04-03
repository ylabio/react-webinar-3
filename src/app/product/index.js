import { memo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { numberFormat } from '../../utils';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
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
        <div>Загрузка...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Head title={product.title} />

      <div className="Product-top">
        <Link to="/" className="Product-back">
          ← Главная
        </Link>
        <BasketTool inline onOpen={callbacks.openBasket} amount={select.amount} sum={select.sum} />
      </div>

      <div className="Product">
        <p className="Product-description">{product.description || 'Нет описания'}</p>

        <div className="Product-info">
          {product.madeIn?.title && (
            <div className="Product-row">
              <div className="Product-label">Страна производитель:</div>
              <div className="Product-value">
                {product.madeIn.title} ({product.madeIn.code})
              </div>
            </div>
          )}

          {product.category?.title && (
            <div className="Product-row">
              <div className="Product-label">Категория:</div>
              <div className="Product-value">{product.category.title}</div>
            </div>
          )}

          {product.edition && (
            <div className="Product-row">
              <div className="Product-label">Год выпуска:</div>
              <div className="Product-value">{product.edition}</div>
            </div>
          )}
        </div>

        <div className="Product-price">
          Цена:
          {' ' + numberFormat(product.price)} ₽
        </div>

        <Button style="primary" onClick={callbacks.addToBasket} title="Добавить" />
      </div>
    </PageLayout>
  );
}

export default memo(Product);
