import {memo, useCallback, useEffect} from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProductInfo from "../../components/product-info";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router";

function About() {
  
  const store = useStore();
  const {id} = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    selectedLanguage: state.language.language,
    pageNumber: state.catalog.pagination.currentPage,
  }));

  useEffect(() => {
    store.actions.catalog.loadSingleProduct(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
    // Смена языка приложения
    changeLanguageTo: useCallback(lang => store.actions.language.setLanguage(lang), [store]),
  };

  return (
    <PageLayout>
      <Head
        title={select.list[0]?.title}
        selectedLanguage={select.selectedLanguage}
        changeLanguageTo={callbacks.changeLanguageTo}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        selectedLanguage={select.selectedLanguage}
      />
      <ProductInfo
        productInfo={select.list[0]}
        onAddItem={callbacks.addToBasket}
        selectedLanguage={select.selectedLanguage}
      />
    </PageLayout>
  );
}

export default memo(About);
