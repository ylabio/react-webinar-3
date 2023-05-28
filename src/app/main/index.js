import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ControlLayout from "../../components/control-layout";
import Pagination from "../../components/pagination";
import Navbar from "../../components/navbar";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    totalPage: state.catalog.totalPage,
    language: state.language.language
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback((page) => store.actions.catalog.load(page), []),
    languageSwitcher: useCallback(() => store.actions.language.languageSwitcher(), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item}
                   onAdd={callbacks.addToBasket}
                   link={`/card-product/${item._id}`}
                   language={select.language.text}/>
    }, [callbacks.addToBasket, select.language]),
  };

  return (
    <PageLayout>
      <Head title={select.language.text.store}
            languageSwitcher={callbacks.languageSwitcher}
            languageSwitcherTitle={select.language.text.switchLanguage}/>
      <ControlLayout>
        <Navbar language={select.language.text}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          language={select.language.text}
        />
      </ControlLayout>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        page={select.page}
        totalPage={select.totalPage}
        onHandleChangePage={callbacks.changePage}
      />
    </PageLayout>

  );
}

export default memo(Main);
