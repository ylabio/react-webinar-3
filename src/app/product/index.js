import { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Details from "../../components/details";
import { useParams } from "react-router-dom";
import Navigation from "../../components/navigation";
import Menu from "../../components/menu";
import Loader from '../../components/loader';
import { translate } from "../../utils";
import Toggler from "../../components/toggler";
import HeadParts from "../../components/head-parts";

function Product() {
  const store = useStore();
  const { productId } = useParams();

  useEffect(() => {
    store.actions.productDetails.load(productId);
  }, [store]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.productDetails.result,
    lang: state.language.lang,
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
     // Переключение языка
    changeLanguage: useCallback(() => store.actions.language.change(), [store]),
  };
 const text = translate('product', select.lang);

  return (
    <PageLayout>
      <HeadParts>
        <Head title={select.product.title} />
        <Toggler checked={select.lang === 'eng'} onChange={callbacks.changeLanguage} />
      </HeadParts>
      <Navigation>
        <Menu text={text.menu}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          text={text.basketTool}
        />
      </Navigation>
      {select.product._id !== undefined ? (
        <Details
          product={select.product}
          addToBasket={callbacks.addToBasket}
          text={text.details}
        />
      ) : (
        <Loader />
      )}
    </PageLayout>
  );
}

export default memo(Product);
