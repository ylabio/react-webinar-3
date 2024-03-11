import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { memo } from 'react';
import ProductInfo from '../../components/product-info';
import Preloader from '../../components/preloader';
import Header from '../../components/header';

import './style.css';

function Product() {

  let { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.product.load(id);
  },[id])

  const product = useSelector(state => state.product.data);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store])
  };

  return (
    <PageLayout>
      {!product ?
        <Preloader />
        :
        <>
          <Header title={product.title}/>
          <ProductInfo product={product} onAction={callbacks.addToBasket} />
        </>
      }
    </PageLayout>
  );
}

export default memo(Product);