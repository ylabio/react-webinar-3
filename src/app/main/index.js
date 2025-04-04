import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ListManagement from '../../components/list-management';
import Controls from '../../components/controls';
import useTranslation from '../../hooks/translation-hook';
import Spinner from '../../components/spinner';
import Error from '../../components/error';

function Main() {
  const store = useStore();
  const translate = useTranslation();

  useEffect(() => {
    store.actions.catalog.load(); // Загрузка первой страницы
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    loading: state.catalog.loading,
    error: state.catalog.error,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  if (select.loading) {
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Head title={translate('title.head')} />
      <Controls />
      {select.error ? (
        <Error error={select.error} />
      ) : (
        <List list={select.list} renderItem={renders.item} />
      )}
      <ListManagement />
    </PageLayout>
  );
}

export default memo(Main);
