import { memo, useCallback, useEffect } from "react";
import List from "../../components/list";
import useSelector from "../../store/use-selector";
import Item from "../../components/item";
import useStore from "../../store/use-store";
import Pagination from "../../components/pagination";

function Catalog() {
  const store = useStore();


  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,

  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return(
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination />
    </>
  )
}

export default memo(Catalog)
