import { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Head from '../../components/head';
import ItemInfo from '../../components/itemInfo';
import NavBar from '../../components/navbar';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function ItemPage() {
    const {id} = useParams();
    // const [data,setData]= useState();
    const store = useStore();
    const select = useSelector(state => ({
      amount: state.basket.amount,
      sum: state.basket.sum,
      item: state.product.item || {}

    }));
    useEffect(() => {
        store.actions.product.load(id)

    },[id])
    const callbacks = {
      // Добавление в корзину
      addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
      // Открытие модалки корзины
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }
    const data = select.item
return (
    <>
    <PageLayout>
    {data._id != undefined & data._id == id
    ?  <>
    <Head title={data.title}/>
    <NavBar
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
    />
    <ItemInfo data={data} onAdd={callbacks.addToBasket} /> </> 
    :
    <>
    <Head />
    </> 
    }
    </PageLayout>
    </>
)
}



export default memo(ItemPage);