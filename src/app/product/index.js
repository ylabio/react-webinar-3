import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import ProductInfo from '../../components/product-info';
import Controls from '../../components/controls';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../store/use-language';
import translations from '../../locales/index';



function Product() {
  const store = useStore();
  const { id } = useParams();
  const { language } = useLanguage();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    store.actions.catalog.setCurrentProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    currentProduct: state.catalog.currentProduct,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  return (
    <PageLayout>
      <Head title={select.currentProduct.title} />
      <Controls>
        <Link to="/">{translations[language].main}</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </Controls>
      <ProductInfo onAdd={callbacks.addToBasket} info={select.currentProduct} />
    </PageLayout>
  );
}

export default memo(Product);
