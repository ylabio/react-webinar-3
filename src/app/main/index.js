import {memo, useCallback, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Paginator from '../../components/paginator';
import LocaleSwitcher from '../../components/locale-switcher';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page")
    store.actions.catalog.load(Number(page) || 1);
  }, [searchParams]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pagesCount: state.catalog.pagesCount,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    locales: state.translator.locales,
    locale: state.translator.locale
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переход на страницу
    setPage: useCallback(page => store.actions.catalog.setPage(page), [store]),
    // Перевод текста
    translate: useCallback(text => store.actions.translator.translate(text), [store, select.locale]),
    // Выбор локали
    setLocale: useCallback(locale => store.actions.translator.setLocale(locale), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} btnAddTitle={callbacks.translate('add')}/>
    }, [callbacks.addToBasket, select.locale]),
  };

  return (
    <PageLayout>
      <Head title={callbacks.translate('store')}>
        <LocaleSwitcher
          locales={select.locales}
          locale={select.locale}
          setLocale={callbacks.setLocale}/>
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        translate={callbacks.translate}/>
      <List
        list={select.list}
        renderItem={renders.item}/>
      <Paginator
        onSetPage={callbacks.setPage}
        pagesCount={select.pagesCount}
        page={select.page} />
    </PageLayout>
  );
}

export default memo(Main);
