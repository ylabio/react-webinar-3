import { memo, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket";
import ProductInfo from "../../components/product-info";
import "./style.css";

function ProductPage() {
  const { id } = useParams();
  const store = useStore();
  const t = store.actions.translator.useTranslate();

  useEffect(() => {
    if (id !== select.product._id) store.actions.product.load(id);
  }, []);

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
  };

  const activeModal = useSelector((state) => state.modals.name);

  const select = useSelector((state) => ({
    product: state.product,
    status: state.product.status,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.translator.language,
  }));

  return (
    <>
      {activeModal === "basket" && <Basket />}
      {/* Если стейт продукта пустой, или открыли новый продукт, показываем Loading... */}
      <PageLayout>
        {!select.product._id || id !== select.product._id ? (
          "Loading..."
        ) : (
          <>
            <Head title={select.product.title} />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            >
              <Link to={"/"}>{t("Главная")}</Link>
            </BasketTool>
            <ProductInfo />
          </>
        )}
      </PageLayout>
    </>
  );
}

export default memo(ProductPage);
