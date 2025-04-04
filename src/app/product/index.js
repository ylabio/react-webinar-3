import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProductInfo from '../../components/product-info';
import Controls from '../../components/controls';
import Spinner from '../../components/spinner';
import Error from '../../components/error';

function Product() {
  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.actions.product.loadProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
  }));

  if (select.loading) {
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <Head title={select.product?.title} />
      <Controls />
      {select.error && <Error error={select.error} />}
      {select.product && <ProductInfo product={select.product} />}
    </PageLayout>
  );
}

export default memo(Product);
