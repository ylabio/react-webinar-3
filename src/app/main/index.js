import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { Link, useParams } from "react-router-dom";
import List from "../../components/list";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Menu from "../../components/menu";
import FlexContainer from "../../components/flex-container";
import LoadErrorComponent from "../../components/load-error-component";
import LoaderList from "../../components/loader-list";

function Main() {
  const store = useStore();
  const params = useParams();
  const page = Number(params.page);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    error: state.catalog.error,
    limit: state.catalog.limit,
    isLoading: state.catalog.isLoading,
    totalPage: state.catalog.totalPage,
    data: state.translate.data,
    lang: state.translate.lang,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    handlerChange: useCallback(
      (lang) => {
        store.actions.translate.setLang(lang);
      },
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  useEffect(() => {
    store.actions.catalog.load((page - 1) * 10);
  }, [page]);

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            titleBtn={select.data.main.addBtn}
            children={<Link to={`/articles/${item._id}`}>{item.title}</Link>}
          />
        );
      },
      [callbacks.addToBasket, select.data]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={select.data.main.title}
        lang={select.lang}
        callback={callbacks.handlerChange}
      />
      <FlexContainer justify={"space-between"} p="20px">
        <Menu link={"/"} textLink={select.data.main.linkHome} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          lang={select.lang}
          data={select.data}
        />
      </FlexContainer>

      <LoadErrorComponent
        error={select.error}
        isLoading={select.isLoading}
        loader={<LoaderList count={select.limit} />}
      >
        <List list={select.list} renderItem={renders.item} />
      </LoadErrorComponent>

      <Pagination
        disabled={select.isLoading}
        currentPage={page}
        totalPages={select.totalPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
