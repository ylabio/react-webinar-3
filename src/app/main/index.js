import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageNumber from "../page-numbers";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.catalog.getMax();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    maxPage: state.catalog.maxPage,
    lang: state.language.lang
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id, item) => store.actions.basket.addToBasket(_id, item), [
      store,
    ]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open("basket"), [
      store,
    ]),
    changePage: useCallback((numb) => store.actions.catalog.changePage(numb)),
    changeLang: useCallback(()=> store.actions.language.changeLang()),
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
      <Head title={select.lang == 'Рус' ? 'Магазин' : 'Shop'} changeLang={callbacks.changeLang} lang={select.lang}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <List list={select.list} renderItem={renders.item} />
      <PageNumber
        changePage={callbacks.changePage}
        page={select.page}
        maxPage={select.maxPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
