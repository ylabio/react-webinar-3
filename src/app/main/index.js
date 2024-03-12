import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import PageLayout from '../../components/page-layout';
import { useLocation } from 'react-router-dom';
import MainMenu from '../main-menu';

function Main() {

  const location = useLocation();

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.product.clear();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    locale: state.i18n.locale
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Переключение страницы
    changePage: useCallback(page => store.actions.catalog.load(page), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <MainMenu title={select.locale.Shop} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        count={select.count}
        currentPage={select.currentPage}
        onPageChange={callbacks.changePage}
      />
    </PageLayout>

  );
}

export default memo(Main);
