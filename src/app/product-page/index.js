import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Head from '../../components/head';

import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import ProductDetails from '../../components/product-details';
import HeaderTools from '../../components/header-tools';

function ProductPage({ catalog, openModalBasket, addToBasket, onLickClick, amount, sum, }) {
    const { id } = useParams();
    const selectedProduct = useSelector(state => state.catalog.selectedProduct);

    useEffect(() => {
        catalog.getProduct(id);
    }, [id])

    if (!selectedProduct) {
        return (<h1>Загрузка...</h1>)
    }

    return (
        <PageLayout>
            <Head titleKey={selectedProduct.title} />
            <HeaderTools
                handleOpen={openModalBasket}
                handleLinkClick={onLickClick}
                amount={amount}
                sum={sum}
            />
            <ProductDetails
                desc={selectedProduct.description}
                country={selectedProduct.madeIn.title}
                category={selectedProduct.category.title}
                edition={selectedProduct.edition}
                price={selectedProduct.price}
                handleAddProduct={() => addToBasket(id)}
            />
        </PageLayout>
    )
}

ProductPage.propTypes = {
    catalog: PropTypes.object,
    openModalBasket: PropTypes.func,
    addToBasket: PropTypes.func,
    amount: PropTypes.number,
    sum: PropTypes.number,
    onLinkClick: PropTypes.func,
}

export default React.memo(ProductPage);