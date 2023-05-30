import React, {useEffect, useCallback} from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket";
import Details from "../../components/details";

function Description() {
    const store = useStore();
    const activeModal = useSelector(state => state.modals.name);

    const select = useSelector(state => ({
        item: state.description,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

    useEffect(() => {
        const id = location.pathname.split("/");
        store.actions.description.load(id[id.length -1]);
    }, [location.pathname]);

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    };

    return(
        <PageLayout>
            <Head title={select.item.title}/>
            <BasketTool
                onOpen={callbacks.openModalBasket} 
                amount={select.amount}
                sum={select.sum}/>
            <Details item={select.item} addToBasket={callbacks.addToBasket}/>
            {activeModal === 'basket' && <Basket/>}
        </PageLayout>
    )
}

export default Description;