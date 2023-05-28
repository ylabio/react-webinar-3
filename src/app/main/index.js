import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import NavBlock from '../nav-block';
import LangSwitch from '../../components/lang-switch';
import useTranslate from '../../hooks/useTranslate';
import Pagination from '../../components/pagination';
import {useLocation, useNavigate} from 'react-router-dom';
import { getQuerystringValue } from '../../utils';
import Loader from '../../components/loader';

function Main() {

  const store = useStore();
  const _ = useTranslate();
  const [currentPage, setCurrentPage] = useState(null);
  
  const navigate = useNavigate();
  const params = useLocation().search;

  const select = useSelector(state => ({
    list: state.catalog.list,
    total: state.catalog.total,
    loading: state.catalog.loading,
    err: state.catalog.err,
    activeLang: state.language.code,
    langsList: state.language.codes
  }));
  

  useEffect(() => {
    store.actions.product.clear();
    const param = getQuerystringValue('page', params);
    let value = 1;
    if (param && /^\d+$/.test(param)) {
      value = parseInt(param);
    }
    setCurrentPage(value);
  }, []);

  useEffect(() => {
    if (currentPage) {
      const query = `?page=${currentPage}`;
      navigate(`${query}`);
      store.actions.catalog.load(currentPage);
    } 
  }, [currentPage]);

  useEffect(() => {
    if (select.err) {
      console.log('eeee')
      setCurrentPage(1);
    } 
  }, [select.err]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Переключение языка
    switchLanguage: useCallback(code => store.actions.language.switch(code), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <PageLayout>
        <Head title={_('mainTitle')}>
          <LangSwitch onClick={callbacks.switchLanguage} defaulCode={select.activeLang} codesArr={select.langsList}/>
        </Head>
        <NavBlock/>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination total={select.total} current={currentPage} onClick={setCurrentPage}/>
      </PageLayout>
      {select.loading && <Loader/>}
    </>

  );
}

export default memo(Main);
