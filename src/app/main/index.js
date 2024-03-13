import {memo, useCallback, useEffect} from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {language} from '../../language';
import {useParams} from 'react-router-dom';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import ItemPagination from '../../components/item-pagination';
import Loading from '../../components/loading';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';

function Main() {

  const store = useStore();

  const params = useParams();

  useEffect(() => {
    const page = params.page ? params.page : 1;
    store.actions.catalog.load(page);
  }, [params]);

  useEffect(() => {
    // localStorage.removeItem('language');
    const langLocal = localStorage.getItem('language');
    if (langLocal) {
      callbacks.changeLanguage(langLocal);
    }
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    numbersPages: state.catalog.numbersPages,
    page: state.catalog.page,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.type,
    langTitle: language.head.title,
    langMenu: language.menu.main,
    langBasketTool: language.basketTool,
    langbuttonAdd: language.item.buttonAdd,
    langText: language.loading.loading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена языка
    changeLanguage: useCallback((language) => store.actions.language.changeLanguage(language), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return (
        <Item item={item} onAdd={callbacks.addToBasket} 
              textButtonAdd={select.langbuttonAdd[select.language]}
              link={`/card/${item._id}`}/>
      );
    }, [callbacks.addToBasket, select.langbuttonAdd[select.language]]),
    ItemPagination: useCallback((item) => {
      return (
        <ItemPagination item={item} list={select.numbersPages} 
                        page={select.page}  link={`/${item.page}`}/>             
      );
    }, [select.numbersPages, select.page]),
  };

  return (
    <PageLayout>
      <Head title={select.langTitle[select.language]} changeLanguage={callbacks.changeLanguage}/>
      <Navbar>
        <Menu langMenu={select.langMenu[select.language]}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} multilingualText={select.langBasketTool} language={select.language}/>
      </Navbar>
      {select.loading 
      ? <Loading langText={select.langText[select.language]}/>
      : <> 
          <List list={select.list} renderItem={renders.item}/>
          <List changeClass={'ListPagination'} list={select.numbersPages} 
                 renderItem={renders.ItemPagination}/>
        </>
      }
    </PageLayout>

  );
}

export default memo(Main);
