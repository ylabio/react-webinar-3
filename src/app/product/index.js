import { memo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { numberFormat } from '../../utils';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

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
      const response = await fetch(`/api/v1/articles/${id}`);
      const json = await response.json();
      setProduct(json.result);
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

        {product.manufacturer?.title && (
          <div className="Product-field">
            Страна производитель: <strong>{product.manufacturer.title}</strong>
          </div>
        )}

        {product.category?.title && (
          <div className="Product-field">
            Категория: <strong>{product.category.title}</strong>
          </div>
        )}

        {product.year && (
          <div className="Product-field">
            Год выпуска: <strong>{product.year}</strong>
          </div>
        )}

        <div className="Product-price">
          <strong>Цена: </strong>
          {numberFormat(product.price)} ₽
        </div>

        <button className="Product-button" onClick={callbacks.addToBasket}>
          Добавить
        </button>
      </div>
    </PageLayout>
  );
}

export default memo(Product);
