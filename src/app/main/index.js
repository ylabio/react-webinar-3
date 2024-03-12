import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { Link, useParams } from "react-router-dom";
import List from "../../components/list";
import LoaderList from "../../components/loader-list";
import ErrorPage from "../../components/page-error";

function Main() {
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
    data: state.translate.data.main.addBtn,
  }));

  const addToBasket = useCallback(
    (_id) => store.actions.basket.addToBasket(_id),
    [store]
  );
  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={addToBasket}
            titleBtn={select.data}
            children={<Link to={`/product/${item._id}`}>{item.title}</Link>}
          />
        );
      },
      [addToBasket, select.data]
    ),
  };

  return (
    <>
      {select.isLoading && <LoaderList count={select.limit} />}
      {select.error && <ErrorPage text={select.error} />}
      {select.list && <List list={select.list} renderItem={renders.item} />}

      <Pagination
        disabled={select.isLoading}
        currentPage={page}
        totalPages={select.totalPage}
      />
    </>
  );
}

export default memo(Main);
