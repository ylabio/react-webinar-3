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
import Row from "../../components/row";
import Loader from "../../components/loader";
import { useSearchParams } from "react-router-dom";

function Main() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  console.log("Main", page);

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.totalAmount();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    isLoading: state.catalog.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesNumber: state.catalog.numberOfPages,
    limitPerPage: state.catalog.limitPerPage,
    page: state.catalog.currentPage,
    lang: state.language.language,
  }));

  console.log("pagesNumber", select.pagesNumber);

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
      (currentPage) => store.actions.catalog.setCurrentPage(currentPage),
      [store]
    ),
    // changeLimit: useCallback(
    //   (limit) => store.actions.catalog.setLimit(limit),
    //   [store]
    // ),
  };

  useEffect(() => {
    if (!page || page === 1) {
      store.actions.catalog.loadPerPage(select.limitPerPage, 0);
    } else {
      store.actions.catalog.loadPerPage(
        select.limitPerPage,
        (page - 1) * select.limitPerPage
      );
    }
  }, [page]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (select.page === 1) {
  //     store.actions.catalog.loadPerPage(select.limitPerPage, 0);
  //   } else {
  //     store.actions.catalog.loadPerPage(
  //       select.limitPerPage,
  //       (select.page - 1) * select.limitPerPage
  //     );
  //   }
  //   setIsLoading(false);
  // }, [select.page, select.limitPerPage]);

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <ItemCatalog
            item={item}
            onAdd={callbacks.addToBasket}
            getTranslation={getTranslation}
            linkTo={`/products/${item._id}`}
          />
        );
      },
      [callbacks.addToBasket, select.lang]
    ),
  };

  const [getTranslation] = useTranslation(select.lang);

  return (
    <PageLayout>
      <Head
        title={getTranslation("shop")}
        onChangeLang={callbacks.changeLanguage}
        lang={select.lang}
      ></Head>

      <Row type="space-between">
        <Link to={"/"}>{getTranslation("home")}</Link>
        <BasketTool
          sum={select.sum}
          amount={select.amount}
          onOpen={callbacks.openModalBasket}
          getTranslation={getTranslation}
        />{" "}
      </Row>
      <Loader isShown={select.isLoading}>
        <List list={select.list} renderItem={renders.item} />

        {select.pagesNumber > 1 && (
          <Pagination
            pagesNumber={select.pagesNumber}
            activePage={page < 1 ? 1 : page}
            onChangePage={callbacks.changePage}
            onChangeLimit={callbacks.changeLimit}
          />
        )}
      </Loader>
    </PageLayout>
  );
}

export default memo(Main);
