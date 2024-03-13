import { memo, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Menu from '../../components/menu'
import BasketTool from "../../components/basket-tool";
import Skeleton from "../../components/skeleton";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductDetails from "../../components/product-details";
import {Row, Col} from '../../components/row-col';

const DetailedPageContainer = ({ t }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {   
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]), 
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await store.actions.catalog.fetchProductById(id);
        setProduct(productData);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных о продукте:', error);
        setIsLoading(false);
      }
    };

    fetchProductData();

  }, [id]);

  return (
    <PageLayout>
      { isLoading 
        ? <Skeleton /> 
        : <>
            <Head title={product ? product.result.title : t('productDetailsError')} t={t} />
            <Row>
              <Col>
                <Menu t={t} />
              </Col>
              <Col>
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} t={t}/>
              </Col>
            </Row>
            <ProductDetails product={product ? product.result : null} addToCart={callbacks.addToBasket} t={t} />
          </>}
    </PageLayout>
  );
};

DetailedPageContainer.propTypes = {
  t: PropTypes.func
};

export default memo(DetailedPageContainer);
