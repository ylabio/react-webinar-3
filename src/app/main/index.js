import { memo, useCallback, useEffect } from "react";
import ItemCatalog from "../../components/item-catalog";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useTranslation from "../../hooks/useTranslation";
import { Link } from "react-router-dom";
import Subhead from "../../components/subhead";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesNumber: state.pagination.numberOfPages,
    limitPerPage: state.pagination.limitPerPage,
    page: state.pagination.currentPage,
    lang: state.language.language,
    langOptions: state.language.options,
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
    changeLanguage: useCallback(
      (lang) => {
        store.actions.language.setLanguage(lang);
      },
      [store]
    ),
    changePage: useCallback(
      (currentPage) => store.actions.pagination.setCurrentPage(currentPage),
      [store]
    ),
    // changeLimit: useCallback(
    //   (limit) => store.actions.pagination.setLimit(limit),
    //   [store]
    // ),
  };

  useEffect(() => {
    if (select.page === 1) {
      store.actions.catalog.loadPerPage(select.limitPerPage, 0);
    } else {
      store.actions.catalog.loadPerPage(
        select.limitPerPage,
        (select.page - 1) * select.limitPerPage
      );
    }
  }, [select.page, select.limitPerPage]);

  useEffect(() => {
    store.actions.pagination.totalAmount();
  }, []);

  const renders = {
    item: useCallback(
      (item) => {
        return <ItemCatalog item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket, select.lang]
    ),
  };

  const [getTranslation] = useTranslation();

  return (
    <PageLayout>
      <Head
        title={getTranslation("shop")}
        onChangeLang={callbacks.changeLanguage}
        lang={select.lang}
      ></Head>

      <Subhead>
        <Link to={"/"}>{getTranslation("home")}</Link>
        <BasketTool
          sum={select.sum}
          amount={select.amount}
          onOpen={callbacks.openModalBasket}
        />{" "}
      </Subhead>

      <List list={select.list} renderItem={renders.item} />
      {select.pagesNumber > 1 && (
        <Pagination
          pagesNumber={select.pagesNumber}
          onChangePage={callbacks.changePage}
          onChangeLimit={callbacks.changeLimit}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
