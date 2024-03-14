import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import Navbar from "../../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import { useTranslateContext } from "../../contexts/translate-context";
import LangSelector from "../../components/lang-selector";

function Main() {
  const store = useStore();

  const navigate = useNavigate();

  const { pageNumber } = useParams();

  const { translate, currentLocale, constructOptionsByLocale, changeLang } =
    useTranslateContext();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemsCount: state.catalog.itemsCount,
    itemsPerPage: state.catalog.itemsPerPage,
    currentPage: state.catalog.currentPage,
    listIsLoading: state.catalog.listIsLoading,
  }));

  useEffect(() => {
    const currentPage = parseInt(pageNumber || select.currentPage, 10);

    const skip = (currentPage - 1) * select.itemsPerPage;

    store.actions.catalog.loadCatalog({ skip, limit: select.itemsPerPage });

    if (pageNumber && parseInt(pageNumber, 10) !== select.currentPage) {
      store.actions.catalog.changePage(currentPage);
    }
  }, [select.currentPage, pageNumber]);

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

    navigateToItemPage: useCallback(
      (_id) => navigate(`/item/${_id}`),
      [navigate]
    ),

    changePage: useCallback(
      (pageNumber) => {
        store.actions.catalog.changePage(pageNumber);
        navigate(`/page/${pageNumber}`);
      },
      [store]
    ),

    translate: useCallback(
      (resourseKey) => translate(resourseKey),
      [translate, currentLocale]
    ),

    constructOptionsByLocale: useCallback(
      (valueName) => constructOptionsByLocale(valueName),
      [constructOptionsByLocale, currentLocale]
    ),

    changeLang: useCallback(
      (event) => changeLang(event.target.value),
      [changeLang, currentLocale]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onTitleClick={callbacks.navigateToItemPage}
            t={callbacks.translate}
          />
        );
      },
      [callbacks.addToBasket, callbacks.navigateToItemPage, callbacks.translate]
    ),
  };

  return (
    <PageLayout>
      <Head title={translate("shop")}>
        <LangSelector
          optionsList={["ru", "en"]}
          onCange={callbacks.changeLang}
          defaultValue={currentLocale}
        />
      </Head>
      <Navbar
        navList={[
          {
            name: translate("main-page"),
            path: `/page/${select.currentPage}`,
          },
        ]}
      >
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          t={callbacks.translate}
          optionsConstructor={callbacks.constructOptionsByLocale}
          locale={currentLocale}
        />
      </Navbar>
      {!select.listIsLoading ? (
        <>
          <List list={select.list} renderItem={renders.item} />
          <Pagination
            currentPage={select.currentPage}
            pagesCount={Math.ceil(select.itemsCount / 10)}
            onPageChange={callbacks.changePage}
          />
        </>
      ) : (
        <Loader />
      )}
    </PageLayout>
  );
}

export default memo(Main);
