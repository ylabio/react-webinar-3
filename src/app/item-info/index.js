import {memo, useCallback, useEffect} from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import {useParams} from 'react-router';
import PageLayout from '../../components/page-layout';
import ItemDescription from '../../components/item-description';
import MenuWrapper from '../../components/menu-wrapper';

function ItemInfo() {

  const store = useStore();

  const itemId = useParams().itemId;

  useEffect(() => {
    store.actions.catalog.loadItem(itemId);
  }, [itemId]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    switchLanguage: useCallback((lang) => store.actions.language.switchLanguage(lang), [store]),
  }

  const select = useSelector(state => ({
    ...state,
    itemInfo: state.catalog.itemInfo,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }))

  return (
    <PageLayout>
      <Head title={select.itemInfo.title} switchLanguage={callbacks.switchLanguage}></Head>
      <MenuWrapper onOpen={callbacks.openModalBasket} amount={select.amount}
                   sum={select.sum} language={select.language}/>
      <ItemDescription itemInfo={select.itemInfo} language={select.language} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  )
}

export default memo(ItemInfo);