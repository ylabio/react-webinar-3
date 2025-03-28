import React, { useCallback } from 'react';
import './styles.css';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import { PageLayout } from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App( { store } ) {
  const list = store.getState().list;

  const handleItemClick = useCallback( ( event, itemCode ) => {
    if ( event.ctrlKey || event.metaKey ) {
      store.toggleItemSelection( itemCode );
    } else {
      store.selectItem( itemCode );
    }
  }, [store] );

  const onDeleteItem = useCallback( ( itemCode ) => {store.onDeleteItem( itemCode )}, [store] );

  const addItem = useCallback( () => {
    store.addItem()
  }, [store] );

  const ListProps = {
    onDeleteItem,
    handleItemClick,
    list,
  };

  return (
    <PageLayout>
      <Head title={ "Приложение на чистом JS" }/>
      <Controls onAdd={ addItem }/>
      <List { ...ListProps }/>
    </PageLayout>
  );
}

export default App;
