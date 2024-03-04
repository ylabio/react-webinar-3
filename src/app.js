import React, {useCallback} from 'react';
import List from "./components/list/index";
import Controls from "./components/controls/index";
import Head from "./components/head/index";
import PageLayout from "./components/page-layout/index";
import Basket from "./components/basket/index";
import { basketList } from './basket';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;

  const [isBasketOpen, setIsBasketOpen] = React.useState(false);

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls onOpenBasket={() => setIsBasketOpen(true)}/>
      <List list={list} />
      {isBasketOpen &&
        <>
          <div className='Overlay' />
          <Basket list={basketList} onClose={() => setIsBasketOpen(false)} />
        </>
      }
    </PageLayout>
  );
}

export default App;
