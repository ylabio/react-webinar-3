import {memo, useCallback, useEffect} from 'react';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import {useParams} from 'react-router';
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import ItemDescription from '../../components/item-description';
import {cn as bem} from '@bem-react/classname';

function ItemInfo(props) {

  const cn = bem('Item-info');

  const store = useStore();

  const itemId = useParams().itemId;

  useEffect(() => {
    store.actions.catalog.loadItem(itemId);
  }, [itemId]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const select = useSelector(state => ({
    ...state,
    itemInfo: state.catalog.itemInfo,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }))

  return (
    <PageLayout>
      <Head title={select.itemInfo.title}></Head>
      <div className={cn('basket-tool-wrapper')}>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </div>
      <ItemDescription itemInfo={select.itemInfo} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  )
}

export default memo(ItemInfo);