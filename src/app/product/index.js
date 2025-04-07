import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useTranslation from '../../hooks/translation-hook';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProductInfo from '../../components/product-info';
import Controls from '../../components/controls';
import Spinner from '../../components/spinner';
import Error from '../../components/error';

function Product() {
  const store = useStore();
  const translate = useTranslation();
  const { id } = useParams();

  const translations = {
    madeIn: translate('productDetails.madeIn'),
    category: translate('productDetails.category'),
    edition: translate('productDetails.edition'),
    price: translate('productDetails.price'),
    buttonText: translate('button.addButton'),
    home: translate('title.controlsTitle'),
    basketTool: {
      one: translate('product.one'),
      few: translate('product.few'),
      many: translate('product.many'),
      empty: translate('basket.emptyBasket'),
    },
  };

  useEffect(() => {
    store.actions.product.loadProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
  }));
  const callbacks = {
    addToBasket: () => {
      store.actions.basket.addToBasket(select.product._id);
    },
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

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
      <Controls openModalBasket={callbacks.openModalBasket} translations={translations} />
      {select.error && <Error error={select.error} />}
      {select.product && (
        <ProductInfo
          translations={translations}
          addToBasket={callbacks.addToBasket}
          product={select.product}
        />
      )}
    </PageLayout>
  );
}

export default memo(Product);
