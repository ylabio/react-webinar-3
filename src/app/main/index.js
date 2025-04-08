import React, { memo, useState, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Footer from '../../components/footer';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useLang } from '../../lang/LangContext';

function Main() {
  const store = useStore();
  const { translate } = useLang();

  const { list, currentPage, itemsPerPage, totalPages  } = useSelector(state => state.catalog);

  const { sum, amount } = useSelector(state => state.basket);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    getInfo: useCallback(_id => store.actions.info.getInfo(_id), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item 
          item={item} 
          onAdd={callbacks.addToBasket} 
          addToBasketText={translate('addToBasket')}
        />;
      },
      [callbacks.addToBasket, translate],
    ),
  };

  useEffect(() => {
    store.actions.catalog.getTotalCount().then(() => {
      store.actions.catalog.load();
    });
  }, [store.actions.catalog]);

  const handlePageChange = (newPage) => {
    store.actions.catalog.setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    store.actions.catalog.setItemsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <PageLayout>
      <Head title={translate('title')} />
      <BasketTool 
        amount={amount} 
        sum={sum} 
        onOpen={callbacks.openModalBasket} 
        pageLinkText={translate('page')}
        emptyBasketText={translate('emptyBasket')}
        pluralForms={{
          one: translate('товар'),
          few: translate('товара'),
          many: translate('товаров')
        }}
      />
      <List list={list} renderItem={renders.item} />
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsOnPageText={translate('itemsOnPage')}
      />
    </PageLayout>
  );
}

export default memo(Main);