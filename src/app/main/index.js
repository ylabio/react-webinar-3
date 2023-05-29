import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import ListProducts from '../../components/listProducts';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { Route, Routes, useLocation } from 'react-router-dom';
import Product from '../product';
import NotFoundPage from '../not-found-page';
import { numberFormat, plural, pluralEn } from '../../utils';

function Main() {

  const store = useStore()

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('page')) || 1)
  const listPerPage = 10

  useEffect(() => {
    store.actions.catalog.load(currentPage, listPerPage);
  }, [currentPage, listPerPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const selectProduct = useSelector((state) => ({
    product: state.catalog.productById,
  }))

  const selectLang = useSelector((state) => ({
    homePageRu: state.lang.homePageRu,
    homePageEn: state.lang.homePageEn,
    productPageRu: state.lang.productPageRu,
    productPageEn: state.lang.productPageEn,
    lang: state.lang.lang,
  }))

  const titleHome = 
    selectLang.lang === 'ru'
      ? selectLang.homePageRu.home_page_title
      : selectLang.homePageEn.home_page_title

  const linkHome = 
    selectLang.lang === 'ru'
      ? selectLang.homePageRu.home_page_link
      : selectLang.homePageEn.home_page_link

  const textBasket = 
    selectLang.lang === 'ru'
      ? selectLang.homePageRu.home_page_text
      : selectLang.homePageEn.home_page_text  
      
  const quantityInBasket = 
    selectLang.lang === 'ru'
      ? selectLang.homePageRu.home_page_quantity
      : selectLang.homePageEn.home_page_quantity   
      
  const textButton = 
    selectLang.lang === 'ru'
      ? selectLang.homePageRu.home_page_button
      : selectLang.homePageEn.home_page_button   

  const textAdd = 
    selectLang.lang === 'ru'
      ? selectLang.productPageRu.product_page_button_add
      : selectLang.productPageEn.product_page_button_add 
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменить язык
    onChangeLang: useCallback(nameLang => store.actions.lang.changeLang(nameLang), [store])
  }

  const renders = {
    item: useCallback((item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} buttonAdd={textAdd}/>
      }, [callbacks.addToBasket, textAdd]),
  };

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getWordProduct = (amount) => {
    if(selectLang.lang === 'ru') {
     return `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})}`
    } else {
     return `${amount} ${pluralEn(amount, {one:'product', other:'products'})}`
    }
  }

  useEffect(() => {
    const id = location.pathname.split('').slice(1).join('')
    store.actions.catalog.getItemById(id);
  }, [location.pathname])
  
  return (
    <PageLayout>
      <Head 
        title={location.pathname === "/" ? titleHome : selectProduct?.product?.title} 
        changeLang={callbacks.onChangeLang}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        link={linkHome}
        text={textBasket}
        empty={quantityInBasket}
        word={getWordProduct}
        textButton={textButton}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ListProducts>
              <List list={select.list} renderItem={renders.item}/>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(select.count / listPerPage)}
                onPageChange={handlePageChange}/>
            </ListProducts>
          }
        />
        <Route path="/:id" element={<Product onAdd={callbacks.addToBasket}/>} />
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
