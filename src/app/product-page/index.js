import { memo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket";
import ProductInfo from "../../components/product-info";
import { useNavigate } from "react-router-dom";
import "./style.css";

function ProductPage() {
  const { id } = useParams();
  const store = useStore();
  const navigate = useNavigate();
  const useTranslate = store.actions.translator.useTranslate();

  useEffect(() => {
    if (id !== select.product._id) store.actions.product.load(id);
  }, [id]);

  const activeModal = useSelector((state) => state.modals.name);

  const select = useSelector((state) => ({
    product: state.product,
    status: state.product.status,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.translator.language,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),

    useTranslate: useCallback(
      (text) => useTranslate(text),
      [store, select.lang]
    ),

    langChange: useCallback(() => {
      store.actions.translator.langChange();
    }, [store]),

    changePage: useCallback(() => {
      navigate("/");
    }, [store, select.currentPage]),
  };

  return (
    <>
      {activeModal === "basket" && <Basket />}
      {/* Если стейт продукта пустой, или открыли новый продукт, показываем Loading... */}
      <PageLayout>
        {!select.product._id || id !== select.product._id ? (
          "Loading..."
        ) : (
          <>
            <Head
              title={select.product.title}
              lang={select.lang}
              langChange={callbacks.langChange}
              useTranslate={callbacks.useTranslate}
            />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              useTranslate={callbacks.useTranslate}
              changePage={callbacks.changePage}
            />
            <ProductInfo
              productData={select.product}
              addToBasket={callbacks.addToBasket}
              useTranslate={callbacks.useTranslate}
            />
          </>
        )}
      </PageLayout>
    </>
  );
}

export default memo(ProductPage);
