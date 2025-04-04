import {memo, useCallback} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationControls from "../../components/pagination-controls";
import ControlsPanel from "../../components/controls-panel";
import {Link, useNavigate} from "react-router";

function Main() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    openItem: useCallback((id) => navigate(`/article/${id}`), [navigate]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} onOpen={callbacks.openItem} />;
      },
      [callbacks.addToBasket, callbacks.openItem]
    ),
  };

  const handlePageChange = (skip, limit) => {
    store.actions.catalog.load({ skip, limit });
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      {/*todo вынести отдельным компонентом*/}
      <ControlsPanel>
        <Link to="/">Главная</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </ControlsPanel>

      <List list={select.list} renderItem={renders.item} />

      <PaginationControls totalCount={select.count} onChange={handlePageChange} />
    </PageLayout>
  );
}

export default memo(Main);
