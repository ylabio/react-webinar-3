import { memo, useCallback, useEffect } from "react";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import Item from "../../components/item";
import List from "../../components/list";
import Menu from "../../components/menu";
import PageLayout from "../../components/page-layout";
import Pagination from "../../components/pagination";
import Row from "../../components/row";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Main() {
  const store = useStore();

  // const [page, setPage] = useState(1);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesAmount: state.catalog.pagesAmount,
    page: state.catalog.page,
  }));

  useEffect(() => {
    try {
      store.actions.catalog.load(select.page);
    } catch (e) {
      alert("Ошибка при загрузке каталога");
      console.error(e);
    }
  }, [select.page]);

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
    // Смена страницы
    changePage: useCallback(
      (page) => {
        store.actions.catalog.changePage(page);
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Row>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Row>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.page}
        totalPages={select.pagesAmount}
        onPageChange={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
