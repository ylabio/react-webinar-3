import {memo, useCallback, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import ItemDetail from '../../components/item-detail';
import Head from '../../components/head';


function ItemFull() {
    
    const store = useStore();
    const params = useParams();

    useEffect(() => {
      store.actions.card.loadCard(params.id);
    }, [params.id]);

    const select = useSelector(state => ({
        card: state.card.dataCard,
        errorMessage: state.card.errorMessage,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

        const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    return (
        <PageLayout>
            <Head title={select.card.title} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
            <ItemDetail card = {select.card} onAddBasket={callbacks.addToBasket} />
        </PageLayout>
    );
}

export default memo(ItemFull);