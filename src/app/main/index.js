import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";
import List from "../../components/list";
import LoaderList from "../../components/loader-list";

function Main() {
  console.log("main");
  const store = useStore();
  const params = useParams();
  const page = Number(params.page);

  useEffect(() => {
    store.actions.catalog.load((page - 1) * 10);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    error: state.catalog.error,
    limit: state.catalog.limit,
    isLoading: state.catalog.isLoading,
    totalPage: state.catalog.totalPage,
  }));

  const addToBasket = useCallback(
    (_id) => store.actions.basket.addToBasket(_id),
    [store]
  );

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={addToBasket} />;
      },
      [addToBasket]
    ),
  };

  return (
    <>
      {select.isLoading && <LoaderList count={select.limit} />}
      {select.error && <h1>{select.error}</h1>}
      {select.list && <List list={select.list} renderItem={renders.item} />}

      <Pagination currentPage={page} totalPages={select.totalPage} />
    </>
  );
}

export default memo(Main);
