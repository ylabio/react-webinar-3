import { useParams, useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import { useCallback, useEffect } from 'react';
import Head from "../../components/head";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Navigation from '../../components/navigation';
import ProductCard from '../../components/product-card';
import Loader from '../../components/loader';

function ProductPage() {
  const { id } = useParams();
  const store = useStore();

  const navigate = useNavigate();
  const location = useLocation();
  
  const select = useSelector(state => ({
    currentItem: state.catalog.currentProduct,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.catalog.isLoading
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => navigate('/basket', {state : {background: location} })),
  }

  
  useEffect(() => {
    store.actions.catalog.loadCurrentProduct(id);
  }, [id])
  
  if (!select.currentItem || select.isLoading) {
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Head title={select.currentItem.title} />
      <Navigation amount={select.amount} sum={select.sum} onOpenBasket={callbacks.openModalBasket} />
      <ProductCard product={select.currentItem} onAddBasket={callbacks.addToBasket} />
    </PageLayout>
  )
}

export default ProductPage;