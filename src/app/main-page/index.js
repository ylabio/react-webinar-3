import useSelector from "../../store/use-selector";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Item from "../../components/item";
import {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import {useTranslate} from "../../i18n";
import {getRoutePath} from "../index";


function MainPage() {
  const store = useStore();
  const t = useTranslate();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    lastPage: state.catalog.lastPage,
    lang: state.application.lang

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
      return (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          productLink={callbacks.getRoutePath('product', item._id)}
          addButtonTitle={t('item-add-button-title')}
        />
      )

    }, [callbacks.addToBasket, select.lang]),
  };

  useEffect(() => {
    store.actions.application.setHeadTitle('main-head-title');
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
