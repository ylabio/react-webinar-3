import { memo, useEffect, useState } from "react"; // Remove useCallback import
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import { getTranslation } from "../../utils";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();
  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
  }));

  const [currentPage, setCurrentPage] = useState(select.currentPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    store.actions.catalog.load(page);
  };

  const addToBasket = (_id) => store.actions.basket.addToBasket(_id);

  const openModalBasket = () => store.actions.modals.open("basket");

  const renderItems = (item) => {
    return <Item item={item} onAdd={addToBasket} />;
  };

  if (select.list.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <Head title={getTranslation("shop")} />
      <BasketTool
        onOpen={openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renderItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={select.totalPages}
        onPageChange={handlePageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
