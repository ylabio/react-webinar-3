import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Loader from '../../components/loader';
import { fetchData } from '../../api';
import { languageConfig } from '../../languages';

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalCount: state.catalog.totalCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  useEffect(() => {
    store.actions.catalog.load(itemsPerPage, (currentPage - 1) * itemsPerPage);
    setIsLoading(false); 
  }, [currentPage]);

  return (
    <PageLayout>
      <Head title={select.lang.language === 'RU' ? languageConfig.title.rus : languageConfig.title.eng}/>
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount}
        sum={select.sum}
      />
      {isLoading && <div className='Loader-wrapper'><Loader/></div>}
      {isLoading == false && 
        <List list={select.list} renderItem={renders.item}/>
      }
      <Pagination
        currentPage={currentPage}
        totalCount={select.totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => onPageChange(page)}
      />
    </PageLayout>
  );
}

export default memo(Main);
