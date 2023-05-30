import { useCallback, useEffect, memo } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductInfo from "../../components/product-info";
import useLang from '../../i18n/use-lang';
import Menu from '../../components/menu';
import WithLoader from '../../components/with-loader';

function ProductPage() {
  const { id } = useParams();
  const { t } = useLang();

  const store = useStore();

  const select = useSelector((state) => ({
    product: {
      id: state.product.info?.id,
      name: state.product.info?.name,
      madeIn: state.product.info?.madeIn,
      description: state.product.info?.description,
      category: state.product.info?.category,
      edition: state.product.info?.edition,
      price: state.product.info?.price,
    },
    loading: state.product.loading,
    error: state.product.error,
  }));

  const callbacks = {
    addToBasket: useCallback(
      () => store.actions.basket.addToBasket(id),
      [store]
    ),
  };

  useEffect(() => {
    store.actions.product.load(id);
    return () => store.actions.product.reset();
  }, [id]);

  return (
    <PageLayout>
      <Head title={select.product?.name} />
      <Menu />
        <WithLoader isLoading={select.loading}>
          <ProductInfo
            product={select.product}
            onAddToBasket={callbacks.addToBasket}
            translate={t}
          />
        </WithLoader>
    </PageLayout>
  );
}

export default memo(ProductPage);
