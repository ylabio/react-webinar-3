import { useLoaderData } from 'react-router-dom';
import Button from '../../components/button';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import { getProductDetails } from '../api/api';
import './style.css';
import useStore from '../../store/use-store';
import { useCallback } from 'react';
import { numberFormat } from '../../utils';

const productDetails = [
  { title: 'Страна производитель:', id: 'madeIn' },
  { title: 'Категория:', id: 'category' },
  { title: 'Год выпуска:', id: 'edition' },
];

export async function loader({ params }) {
  const result = await getProductDetails(params.itemId);

  return { result };
}

function ProductPage() {
  const store = useStore();
  const { result: product } = useLoaderData();

  // TODO добавить в корзину
  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(product._id), [store]),
  };

  return (
    <PageLayout head={<Head title={product.title} />}>
      <div className="Product">
        <span className="Page-section-name">Главная</span>
        <span>{product.description}</span>
        <ul className="Product-details">
          {productDetails.map(({ title, id }) => (
            <li className="Product-details-item" key={id}>
              <span>{title}</span>
              <b>{product[id]?.title ?? product[id]}</b>
            </li>
          ))}
        </ul>
        <div className="Product-price">
          <b>Цена</b>
          <b>{numberFormat(product.price)}</b>
        </div>
        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
      </div>
    </PageLayout>
  );
}

export default ProductPage;
