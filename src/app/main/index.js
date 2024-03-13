import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import translations from '../../components/language/library';


function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    return () => callbacks.closeModal();
  }, [store.state.catalog.currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    lastPage: state.catalog.lastPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка текущей страницы
    setCurrentPage: useCallback(page => store.actions.catalog.setCurrentPage(page), [store]),
    // Закрытие модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Изменения языка приложения
    setLanguage: useCallback(language => store.actions.language.setLanguage(language), [store])
  }
  const renders = {
    item: useCallback((item) => {
      return <Item item={item} addButtonText={translations[select.language].add} onAdd={callbacks.addToBasket} pageLink={`/product/${item._id}`} />
    }, [callbacks.addToBasket, select.language]),
  };

  return (
    <PageLayout>
      <Head title={translations[select.language].headerTitle} setLanguage={callbacks.setLanguage} language={select.language} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} language={translations[select.language]} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination currentPage={select.currentPage} lastPage={select.lastPage} setCurrentPage={callbacks.setCurrentPage} />
    </PageLayout>

  );
}

export default memo(Main);
