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

  const translations = {
    elementSelect: translate('elementSelect'),
    itemButton: translate('button.addButton'),
    title: translate('title.head'),
    home: translate('title.controlsTitle'),
    basketTool: {
      one: translate('product.one'),
      few: translate('product.few'),
      many: translate('product.many'),
      empty: translate('basket.emptyBasket'),
    },
  };
  useEffect(() => {
    store.actions.catalog.load(); // Загрузка первой страницы
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    loading: state.catalog.loading,
    error: state.catalog.error,
    itemsPerPage: state.catalog.itemsPerPage,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onPageChange: useCallback(
      page => {
        store.actions.catalog.load(page);
      },
      [store],
    ),

    onItemsPerPageChange: useCallback(
      itemsPerPage => {
        store.actions.catalog.changeItemsPerPage(itemsPerPage);
      },
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item item={item} onAdd={callbacks.addToBasket} itemButton={translations.itemButton} />
        );
      },
      [callbacks.addToBasket, translations.itemButton],
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
      <Head title={translations.title} />
      <Controls openModalBasket={callbacks.openModalBasket} translations={translations} />
      {select.error ? (
        <Error error={select.error} />
      ) : (
        <List list={select.list} renderItem={renders.item} />
      )}
      <ListManagement
        onPageChange={callbacks.onPageChange}
        onItemsPerPageChange={callbacks.onItemsPerPageChange}
        itemsPerPage={select.itemsPerPage}
        totalItems={select.totalItems}
        currentPage={select.currentPage}
        translations={translations}
      />
    </PageLayout>
  );
}

export default memo(Main);
