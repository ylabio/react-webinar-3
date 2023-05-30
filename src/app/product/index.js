import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductItem from "../../components/product-item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";

function Product({ }) {
    const [isLoading, setIsLoading] = useState(false)
    const store = useStore();
    const { id } = useParams();

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                await store.actions.product.load(id);
            }
            catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [id]);

    const select = useSelector(state => ({
        product: state.product.product,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }


    return (
        <PageLayout>
            <Head title={select.product.title} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            {isLoading ? <p>Загрузка</p> :<ProductItem product={select.product} addToBasket={callbacks.addToBasket} />}
        </PageLayout>
    )
}

export default memo(Product);