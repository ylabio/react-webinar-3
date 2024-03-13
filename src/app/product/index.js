import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import { memo, useCallback, useEffect } from "react";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemProduct from "../../components/item-product";
import Loader from "../../components/loader";
import Error from "../../components/error";
import NavWrapper from "../../components/nav-wrapper";
import Nav from "../../components/nav";
import { langData } from "../../store/language/langData";

function Product() {

  const store = useStore();
  const params = useParams()

  useEffect(() => {
    store.actions.product.getProduct(params.id)
  }, [params.id]);

  const select = useSelector(state => ({
    product: state.product.data,
    isLoading: state.product.isLoading,
    isError: state.product.isError,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLanguage
  }));

  const translations = {
    nav: {
      navTitle: langData[select.language].main
    },
    basketTool: {
      inCart: langData[select.language].inCart,
      one: langData[select.language].item.one,
      few: langData[select.language].item.few,
      many: langData[select.language].item.many,
      empty: langData[select.language].item.empty,
      goTo: langData[select.language].buttons.goTo
    },
    loader: {
      loading: langData[select.language].service.loading
    },
    error: {
      error: langData[select.language].service.error
    },
    itemProduct: {
      country: langData[select.language].product.country,
      category: langData[select.language].product.category,
      year: langData[select.language].product.year,
      price: langData[select.language].product.price,
      add: langData[select.language].buttons.add
    }
  }

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    toggleLanguage: useCallback(() => store.actions.language.toggleLanguage(), [store])
  }

  return (
    <PageLayout>
      <Head title={select.product?.title}/>
      <NavWrapper>
      <Nav translations={translations.nav} path='/'/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        translations={translations.basketTool}/>
      </NavWrapper>
      <Loader isLoading={select.isLoading} translations={translations.loader}>
        <Error isError={select.isError} translations={translations.error}>
          <ItemProduct
            product={select.product}
            addToBasket={callbacks.addToBasket}
            translations={translations.itemProduct}/>
        </Error>
      </Loader>
    </PageLayout>
  );
}

export default memo(Product);
