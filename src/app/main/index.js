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

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
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
    store.actions.catalog.load();
    (async () => {
      const response = await fetch(`/api/v1/articles?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}&fields=items(_id, title, price),count`);
      const json = await response.json();
      setTotalCount(json.result.count)
      setData(json.result.items);
      setIsLoading(false);
    })()   
    
  }, [currentPage]);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      {isLoading && <div className='Loader-wrapper'><Loader/></div>}
      {isLoading == false && 
        <List list={data} renderItem={renders.item}/>
      
      }
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => onPageChange(page)}
      />
    </PageLayout>
  );
}

export default memo(Main);
