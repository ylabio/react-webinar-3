import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Navigation from "../../components/navigation";
import Menu from "../../components/menu";
import Loader from "../../components/loader";
import Toggler from "../../components/toggler";
import HeadParts from "../../components/head-parts";
import { translate } from "../../utils";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(1);
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    page: state.catalog.page,
    waiting: state.catalog.waiting,

    amount: state.basket.amount,
    sum: state.basket.sum,

    lang: state.language.lang,
  }));

  // console.log("page=", select.page);
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
    // Переход на страницу товара
    onTransition: useCallback(
      (_id) => store.actions.productDetails.load(_id),
      []
    ),
    // Смена номера страницы каталога
    changePage: useCallback((page) => store.actions.catalog.load(page), []),
    // Переключение языка
    changeLanguage: useCallback(() => store.actions.language.change(), [store]),
  };

  const text = translate('main', select.lang);

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onTransition={callbacks.onTransition}
            onAdd={callbacks.addToBasket}
            url="/articles"
            text={text.item}
          />
        );
      },
      [callbacks.addToBasket, text, callbacks.onTransition]
    ),
  };

  return (
    <PageLayout>
      <HeadParts>
        <Head text={text.head} />
        <Toggler checked={select.lang === 'eng'} onChange={callbacks.changeLanguage} />
      </HeadParts>
      <Navigation>
        <Menu text={text.menu} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          text={text.basketTool}
        />
      </Navigation>
        <Loader active={select.waiting}>
          <List list={select.list} renderItem={renders.item} />
          <Pagination
            currentPage={select.page}
            totalArticles={select.count}
            changePage={callbacks.changePage}
          />
        </Loader>
    </PageLayout>
  );
}

export default memo(Main);
