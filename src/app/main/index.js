import {memo, useCallback, useState, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Controls from "../../components/controls";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLanguage } from '../../language-context';

function Main() {
  const { translate } = useLanguage();

  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchCatalog();
  }, [currentPage]);

  const fetchCatalog = async () => {
    try {
      const skip = (currentPage - 1) * limit;
      await store.actions.catalog.load(limit, skip);
      const totalPages = await store.actions.catalog.getTotalPages(limit);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Ошибка при загрузке каталога:', error);
    }
  };

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
    onPageChange: useCallback(page => setCurrentPage(page), []),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={translate('Магазин')}/>
      <Controls onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={callbacks.onPageChange} />
    </PageLayout>

  );
}

export default memo(Main);
