import useSelector from "../../store/use-selector";
import List from "../../components/list";
import Pagination from "../../components/Pagination";
import {getRoutePath} from "../../router/config";
import Item from "../../components/item";
import {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";


function MainPage() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    lastPage: state.catalog.lastPage,

  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadCatalogPage: useCallback((page) => store.actions.catalog.load(page), [store]),
    getRoutePath: useCallback((...args) => getRoutePath(...args), [])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} getRoutePath={callbacks.getRoutePath}/>
    }, [callbacks.addToBasket]),
  };

  useEffect(()=>{
    store.actions.application.setHeadTitle('Магазин');
  }, [])


  return (
    <>
      <List list={select.list} renderItem={renders.item}/>
      {select.list.length > 0 &&
        <Pagination page={select.page} lastPage={select.lastPage} onPageLoad={callbacks.loadCatalogPage}/>}
    </>
  )
}

export default MainPage;
