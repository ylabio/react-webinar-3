import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import useTranslate from '../../hooks/use-translate';
import { Link } from 'react-router-dom';

function Main() {
  const store = useStore();
  const actions = store.actions;
  const { t } = useTranslate();

  useEffect(() => {
    actions.ui.setTitle(t('shop'));
    void actions.catalog.load();
  }, [actions.ui, actions.catalog, t]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.catalog.skip,
    limit: state.catalog.limit,
    total: state.catalog.total,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => actions.basket.addToBasket(_id), [actions.basket]),
    openModalBasket: useCallback(() => actions.modals.open('basket'), [actions.modals]),
    setPage: useCallback(page => actions.catalog.setPage(page), [actions.catalog]),
    setLimit: useCallback(limit => actions.catalog.setLimit(limit), [actions.catalog]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <div className="Product-top">
        <Link to="/" className="Product-back">
          {t('home')}
        </Link>
        <BasketTool
          inline
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </div>
      <List list={select.list || []} renderItem={renders.item} />
      <Pagination
        page={select.skip / select.limit + 1}
        limit={select.limit}
        total={select.total}
        onChange={callbacks.setPage}
        onChangeLimit={callbacks.setLimit}
      />
    </PageLayout>
  );
}

export default memo(Main);
