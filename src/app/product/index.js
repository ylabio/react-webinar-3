import {memo, useEffect, useCallback, useContext} from 'react';
import {useParams} from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from '../../store/use-selector';
import PageLayout from "../../components/page-layout";
import HeadContainer from '../head-container';
import {TextDataContext} from '../../contexts';
import ProductContent from '../../components/product-content';

function Product({onChangeTextDataQuery}) {

  const textData = useContext(TextDataContext);

  const store = useStore();
  let {productId} = useParams();
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
      <HeadContainer onChangeTextDataQuery={onChangeTextDataQuery}
                     headTextData={{...textData.productHead,
                                      title: product.title,
                                  }}
      />
      <ProductContent product={product}
                      onAdd={addToBasket}
                      textData={textData.productFull}
      />
    </PageLayout>
  );
}

Product.defaultProps = {
  onChangeTextDataQuery: () => {},
}

export default memo(Product);
