import { memo, useEffect } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import ProductCard from "../../components/product-card";

function ProductPage({id}) {
    const cn = bem('ProductPage');

    const store = useStore();

    const [product, setProduct] = useState({});

    useEffect(() => {
        const prod = store.actions.catalog.getProduct(id);
        setProduct(prod);
    }, []);

    return (
        <PageLayout>
            <BasketTool/>
            <ProductCard/>
        </PageLayout>
    );
};

ProductPage.propTypes = {
    id: PropTypes.string
}

export default memo(ProductPage);

