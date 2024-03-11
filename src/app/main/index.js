import {memo, useCallback, useEffect} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ItemPagination from '../../components/item-pagination';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    numbersPages: state.catalog.numbersPages,
    page: state.catalog.page,
    // multilingualism: state.catalog.multilingualism,
    language: state.language.type,
    langTitle: state.language.head.title,
    langBasketTool: state.language.basketTool,
    langbuttonAdd: state.language.item.buttonAdd,
    // langType: state.language.type,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переход на другую страницу
    changePage: useCallback((page) => store.actions.catalog.changePage(page), [store]),
    // Смена языка
    changeLanguage: useCallback((language) => store.actions.language.changeLanguage(language), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return (
        <Item item={item} onAdd={callbacks.addToBasket} 
              textButtonAdd={select.langbuttonAdd[select.language]}/>
      );
    }, [callbacks.addToBasket, select.langbuttonAdd[select.language]]),
    ItemPagination: useCallback((item) => {
      return (
        <ItemPagination item={item} list={select.numbersPages} 
                        page={select.page} changePage={callbacks.changePage}/>
      );
    }, [select.numbersPages, select.page, callbacks.changePage]),
  };

  return (
    <PageLayout>
      <Head title={select.langTitle[select.language]} changeLanguage={callbacks.changeLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} multilingualText={select.langBasketTool} language={select.language}/>
      <List list={select.list} renderItem={renders.item} 
            textButtonAdd={select.langbuttonAdd[select.language]}/>
      <List changeClass={'ListPagination'} list={select.numbersPages} 
          page={select.page} renderItem={renders.ItemPagination}/>
    </PageLayout>

  );
}

export default memo(Main);
