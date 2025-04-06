import { memo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useTranslate from '../../hooks/use-translate';
import BasketTool from '../../components/basket-tool';
import './style.css';
import useSelector from '../../store/use-selector';
import ProductView from './components/product-view';

function Product() {
  const { id } = useParams();
  const store = useStore();
  const { t } = useTranslate();
  // const [product, setProduct] = useState(null);
  const select = useSelector(state => ({
    product: state.product.current,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  useEffect(() => {
    void store.actions.product.load(id);
    return () => store.actions.product.clear();
  }, [id, store.actions.product]);

  if (!select.product) return null;

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
      <ProductView
        product={select.product}
        onAdd={() => store.actions.basket.addToBasket(select.product._id)}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Product);
