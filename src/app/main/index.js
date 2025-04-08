import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Controls from '../../components/controls';
import { useTranslation } from '../../i18n/language-context';

function Main() {
  const store = useStore();
  const { t } = useTranslation();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
  }));

  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const skip = select.currentPage * itemsPerPage - itemsPerPage;
    store.actions.catalog.load(itemsPerPage, skip);
  }, [itemsPerPage, select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка текущей страницы пагинации
    setCurrentPage: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} t={t}/>;
      },
      [callbacks.addToBasket, t],
    ),
  };

  return (
    <PageLayout>
      <Head title={t('Shop')} />
      <Controls
        onClick={callbacks.setCurrentPage}
        openModalBasket={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        t={t}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        onClick={callbacks.setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={select.currentPage}
        totalPages={select.totalPages}
      />
    </PageLayout>
  );
}

export default memo(Main);
