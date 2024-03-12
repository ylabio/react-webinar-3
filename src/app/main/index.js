import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { UI_TEXTS } from '../../consts/content';

function Main() {
  const store = useStore();

  const [page, setPage] = useState({ newValue: 1, oldValue: 1 })
  const [isLoading, setIsLoading] = useState(true)

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLanguage
  }));

  useEffect(() => {
    const fetchCatalog = async () => {
      await store.actions.catalog.load(page.newValue, select.language)
      setIsLoading(false)
    }
    fetchCatalog()
  }, [page, select.language]);



  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handleSelectPage(pageNumber) {
      setPage(pageNumber)
      setIsLoading(true)
    },
  }

  const uiText = {
    title: UI_TEXTS[select.language].main.head.headTitle,
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <Head title={uiText.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        totalPages={select.totalPages}
        currentPage={!isLoading ? page.newValue : page.oldValue}
        handleSelectPage={callbacks.handleSelectPage}
      />
    </>
  );
}

export default memo(Main);
