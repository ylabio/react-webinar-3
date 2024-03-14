import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import ProductLayout from "../../components/product-layout";
import ProductInfo from "../../components/product-info";
import TopMenuContainer from "../../components/top-menu-container";
import MainMenu from "../../components/main-menu";

const ProductPage = () => {

    const { productId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const store = useStore();

    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        pagination: state.catalog,
        productInfo: state.product
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        // Изменение текущей страницы
        changePage: useCallback((number) => store.actions.catalog.changePage(number), [store])
    }

    useEffect(() => {
        const loadPage = async (productId) => {
            await store.actions.product.loadInfo(productId);
            setIsLoaded(true)
        }

        loadPage(productId)
    }, [productId])

    return (
            <>
                <ProductLayout>
                    <Head title={select.productInfo.title} />
                    <TopMenuContainer>
                        <MainMenu changePage={callbacks.changePage} />
                        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                        sum={select.sum} />
                    </TopMenuContainer>
                    {isLoaded ? <ProductInfo description={select.productInfo.description}
                                _id={select.productInfo._id}
                                madeIn={select.productInfo.madeIn}
                                madeInCode={select.productInfo.madeInCode}
                                category={select.productInfo.category}
                                year={select.productInfo.edition}
                                cost={select.productInfo.price}
                                addToBasket={callbacks.addToBasket} /> : <p style={{'textAlign': 'center'}}>Loading product info...</p>}
                </ProductLayout>
            </>
    )
}

export default memo(ProductPage)