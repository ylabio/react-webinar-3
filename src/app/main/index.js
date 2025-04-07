import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import List from '../../components/list';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useStore from '../../store/use-store';

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlPage = Number(searchParams.get('page')) || 1;
  const urlQuantity = Number(searchParams.get('quantity')) || 10;

  const select = useSelector(state => ({
    list: state.catalog.list || [],
    page: state.catalog.page || 1,
    quantity: state.catalog.quantity || 10,
    availableQuantities: state.catalog.availableQuantitys || [5, 10, 20],
  }));

  // Синхронизируем стор с URL при загрузке
  useEffect(() => {
    if (select.page !== urlPage) {
      store.actions.catalog.setPage(urlPage);
    }
    if (select.quantity !== urlQuantity) {
      store.actions.catalog.setQuantity(urlQuantity);
    }
  }, [store, urlPage, urlQuantity, select.page, select.quantity]);

  // Устанавливаем заголовок
  useEffect(() => {
    store.actions.ui.setTitle('Магазин');
  }, [store]);

  // Загружаем данные после синхронизации
  useEffect(() => {
    store.actions.catalog.load(urlPage, urlQuantity);
  }, [store, urlPage, urlQuantity]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    selectFromStore: useCallback(
      _id => {
        console.log('Переход к товару:', _id);
        navigate(`/product/${_id}`);
      },
      [navigate],
    ),
    setPage: useCallback(
      page => {
        store.actions.catalog.setPage(page);
        setSearchParams({ page, quantity: urlQuantity });
      },
      [store, urlQuantity, setSearchParams],
    ),
    setQuantity: useCallback(
      quantity => {
        store.actions.catalog.setQuantity(quantity);
        setSearchParams({ page: 1, quantity });
      },
      [store, setSearchParams],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item item={item} onAdd={callbacks.addToBasket} onSelect={callbacks.selectFromStore} />
        );
      },
      [callbacks.addToBasket, callbacks.selectFromStore],
    ),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={urlPage}
        totalPages={25}
        setCurrentPage={callbacks.setPage}
        currentQuantity={urlQuantity}
        setCurrentQuantity={callbacks.setQuantity}
        availableQuantities={select.availableQuantities}
      />
    </>
  );
}

export default memo(Main);
