import React, { memo, useCallback, useEffect } from "react";
import { useLanguage } from '../../language-context';
import translations from '../../locales';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductDetails from "../../components/product-details";
import Head from "../../components/head";
import HomeLink from "../../components/home-link";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import { useParams } from "react-router-dom";
import LanguageToggle from "../../components/language-toggle";

function ProductPage() {
  const { id } = useParams();
  const store = useStore();
  const { language } = useLanguage();
  const t = (key) => translations[language][key];

  const select = useSelector(state => ({
    product: state.product.current,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.product.loadProduct(id);
    return () => store.actions.product.clearProduct();
  }, [id, store]);

  const callbacks = {
    addToBasket: useCallback(() => {
      if (select.product) {
        store.actions.basket.addToBasket(select.product._id);
      }
    }, [store, select.product]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  };

  return (
    <PageLayout
      head={
        <>
          <Head title={select.product?.title || 'Товар'}>
            <LanguageToggle/>
          </Head>
          <div className="header-container">
            <div className="header-content">
              <HomeLink/>
              <div className="basket-tool-wrapper">
                <BasketTool
                  onOpen={callbacks.openModalBasket}
                  amount={select.amount}
                  sum={select.sum}
                />
              </div>
            </div>
          </div>
        </>
      }
    >
      <ProductDetails
        product={select.product}
        onAddToCart={callbacks.addToBasket}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(ProductPage);
