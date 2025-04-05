import { Link, useLoaderData } from 'react-router-dom';
import Button from '../../components/button';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import { getProductDetails } from '../api/api';
import './style.css';
import { memo, useCallback, useContext } from 'react';
import { numberFormat } from '../../utils';
import { ROUTES } from '../../constants';
import useStore from '../../hooks/use-store';
import { LanguageContext } from '../../store/context';

const productDetails = [
  { translationCode: 'country', id: 'madeIn' },
  { translationCode: 'category', id: 'category' },
  { translationCode: 'productionYear', id: 'edition' },
];

export async function loader({ params }) {
  const result = await getProductDetails(params.id);

  return { result };
}

function ProductPage() {
  const store = useStore();
  const { result: product } = useLoaderData();
  const { translate, language } = useContext(LanguageContext);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(product._id), [store]),
  };

  return (
    <PageLayout head={<Head title={product.title} />}>
      <div className="Product">
        <span></span>
        <Link className="Product-back" to={ROUTES.MAIN}>
          <span>{translate('home')}</span>
        </Link>
        <span>{product.description}</span>
        <ul className="Product-details">
          {productDetails.map(({ translationCode, id }) => (
            <li className="Product-details-item" key={id}>
              <span>{translate(translationCode)}:</span>
              <b>{product[id]?.title ?? product[id]}</b>
            </li>
          ))}
        </ul>
        <div className="Product-price">
          <b>{translate('price')}</b>
          <b>{numberFormat(product.price, language)}</b>
        </div>
        <Button
          style="primary"
          onClick={() => callbacks.addToBasket(product._id)}
          title={translate('add')}
        />
      </div>
    </PageLayout>
  );
}

export default memo(ProductPage);
