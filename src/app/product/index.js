import {memo, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from '../../store/use-selector';
import PageLayout from "../../components/page-layout";
import HeadLayout from '../head-layout';
import ProductContent from '../../components/product-content';

function Product({onToggleLanguage}) {

  const store = useStore();
  let { productId } = useParams();
  const product = useSelector(state => state.product.fullData);

  useEffect(() => {
    if(!product || productId !== product._id) {
      store.actions.product.load(productId);
    }
  }, [productId, product]);

  const addToBasket = useCallback(_id => store.actions.basket.addToBasket(_id), [store]);

  if(!product || productId !== product._id) return <h1>...Loading</h1>;

  return (
    <PageLayout>
      <HeadLayout headTitle={product.title} onToggleLanguage={onToggleLanguage}/>
      <ProductContent product={product} onAdd={addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);
