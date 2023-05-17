
import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
    const list = store.getState().list;

    //Задание 1 && Задание 3
    const [ selectedIndex, setSelectedIndex ] = React.useState(null)
    function handleItemClick(item) {
        if(selectedIndex === item.code){
            item.isSelecte = false
            setSelectedIndex(null)
        }else{
            item.isSelecte = true
            setSelectedIndex(item.code)
            item.selectedValue++
        }
    }


  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onAdd={callbacks.onAddItem}/>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}/>
    </PageLayout>
  );
}

export default App;
