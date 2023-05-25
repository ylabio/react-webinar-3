import { memo, useCallback, useEffect } from "react";
import BasketTool from "../../components/basket-tool";
import ContentHeader from "../../components/content-header";
import Head from "../../components/head";
import Item from "../../components/item";
import LangSwitcher from "../../components/lang-switcher";
import List from "../../components/list";
import PageLayout from "../../components/page-layout";
import Pagination from "../../components/paginate";
import { useTranslation } from "../../store/translation";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import browserRoutes from "../lib/browserRoutes";

function Main() {
  const store = useStore();

  const { t } = useTranslation();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const { totalPages, currentPage } = useSelector((s) => ({
    totalPages: s.catalog.totalPages,
    currentPage: s.catalog.currentPage,
  }));
  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
    handlePageChange: useCallback((page) => {
      store.actions.catalog.load(page);
    }, []),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} titleLink={browserRoutes.product(item._id)} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title={t("shop")}>
        <LangSwitcher />
      </Head>
      <ContentHeader>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ContentHeader>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={callbacks.handlePageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
