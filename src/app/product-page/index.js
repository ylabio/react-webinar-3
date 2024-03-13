import { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import ProductCard from "../../components/product-card";
import useSelector from "../../store/use-selector";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Head from "../../components/head";

function ProductPage() {
    
    const cn = bem('ProductPage');

    const store = useStore();

    const { itemId } = useParams();

    const [product, setProduct] = useState({});

    const navigate = useNavigate();

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    useEffect(() => {
        const fetchData = async () => {
            const prod = await store.actions.catalog.getProduct(itemId);
            setProduct(prod);
        };

        fetchData();
    }, []);

    if (!product) {
        return <div>Загрузка...</div>; 
    }

    return (
        <PageLayout>
            <Head title={product?.title}/>
            <BasketTool onOpen={() => {
                store.actions.modals.open('basket');
                navigate('/');
            }
            } amount={select.amount}
                sum={select.sum} />
            <ProductCard product={product} onAdd={() => store.actions.basket.addToBasket(product._id)}/>
        </PageLayout>
    );
};

ProductPage.propTypes = {
    itemId: PropTypes.string
}

export default memo(ProductPage);

