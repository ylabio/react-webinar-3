import React from 'react';
import List from './components/list/index.jsx';
import Controls from './components/controls/index.jsx';
import Head from "./components/head/index.jsx";
import PageLayout from "./components/page-layout/index.jsx";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
    const list = store.getState().list;

    const onDeleteItem = (code) => {
        store.deleteItem(code);
    }
    const onSelectItem = (code) => {
        store.selectItem(code);
    }
    const onAddItem = () => {
        store.addItem();
    }
    return (
       <PageLayout>
        <Head title={"Приложение на чистом JS"}/>
        <Controls onAdd={onAddItem}/>
        <List list={list} onDeleteItem={onDeleteItem} onSelectItem={onSelectItem} />
       </PageLayout>
    );
}

export default App;
