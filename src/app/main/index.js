import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { lang } from '../../data/lang';
import Navigation from '../../components/navigation';
import ToolContainer from '../../components/tool-container';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.loadTotalAmount();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    totalAmount: state.catalog.totalAmount,
    lang: state.lang.lang,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.load(select.page);
  }, [select.page])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка текущей страницы
    setCurrentPage: useCallback(page => store.actions.catalog.setPage(page), [store]),
    // Переключение языка
    toggleLang: useCallback(() => store.actions.lang.toggleLang(), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} 
        itemLink={`/items/${item._id}`} 
        language={select.lang}
        onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <Head title={lang[select.lang].titles.main} language={select.lang} onToggleLang={callbacks.toggleLang} />
      <ToolContainer>
        <Navigation language={select.lang} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} language={select.lang} />
      </ToolContainer>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination totalAmount={select.totalAmount} currentPage={select.page}
                  onChangePage={callbacks.setCurrentPage} />
    </PageLayout>
  );
}

export default memo(Main);
