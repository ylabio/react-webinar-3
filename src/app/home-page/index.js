import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import List from '../../components/list';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/use-store';

function HomePage() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list || [],
    page: state.catalog.page || 1,
    quantity: state.catalog.quantity || 10,
    availableQuantities: state.catalog.availableQuantitys || [5, 10, 20],
  }));

  const navigate = useNavigate();

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
    setPage: useCallback(page => store.actions.catalog.setPage(page), [store]),
    setQuantity: useCallback(quantity => store.actions.catalog.setQuantity(quantity), [store]),
  };

  useEffect(() => {
    if (!select.list.length) {
      store.actions.catalog.load(select.page, select.quantity);
    }
  }, [store, select.page, select.quantity, select.list.length]);

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
        currentPage={select.page}
        totalPages={25}
        setCurrentPage={callbacks.setPage}
        currentQuantity={select.quantity}
        setCurrentQuantity={callbacks.setQuantity}
        availableQuantities={select.availableQuantities}
      />
    </>
  );
}

export default memo(HomePage);
