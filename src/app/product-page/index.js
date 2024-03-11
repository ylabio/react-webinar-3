import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket"
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import ProductLayout from "../../components/product-layout";
import ProductInfo from "../../components/product-info";

const ProductPage = () => {

    const { productId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const store = useStore();

    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        pagination: state.pages,
        activeModal: state.modals.name,
        productInfo: state.product
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

        changePage: useCallback((number) => store.actions.pages.changePage(number), [store])
    }

    useLayoutEffect(() => {
        const loadPage = async (productId) => {
            await store.actions.product.loadInfo(productId);
            setIsLoaded(true)
        }

        store.actions.catalog.load(select.pagination.currentPage)
        loadPage(productId)
    }, [store])

    return (
            <>
                <ProductLayout>
                    <Head title={select.productInfo.title} />
                    <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} changePage={callbacks.changePage}/>
                    {isLoaded ? <ProductInfo description={select.productInfo.description}
                                _id={select.productInfo._id}
                                madeIn={select.productInfo.madeIn}
                                category={select.productInfo.category}
                                year={select.productInfo.edition}
                                cost={select.productInfo.price}
                                addToBasket={callbacks.addToBasket} /> : <p style={{'textAlign': 'center'}}>Loading product info...</p>}
                </ProductLayout>
                {select.activeModal === 'basket' && <Basket />}
            </>
    )
}

export default memo(ProductPage)