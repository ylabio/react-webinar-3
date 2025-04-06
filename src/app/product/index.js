import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router';
import Navbar from '../../components/navbar';
import ProductInfo from '../../components/product-info';
import BasketTool from '../../components/basket-tool';

function Product() {
  const { id } = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    selectedProduct: state.catalog.selectedProduct,
    lang: state.language.lang,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    store.actions.catalog.getProduct(id);
  }, [id, select.lang]);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  const renders = {
    tool: useCallback(
      () => {
        return <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />;
      },
      [select.sum, select.lang],
    ),
  };

  return (
    <PageLayout>
      <Head title={select.selectedProduct?.title} />
      <Navbar path='/' renderBasket={renders.tool} lang={select.lang} />
      {select.selectedProduct ? (
        <ProductInfo
          // _id={select.selectedProduct._id}
          desc={select.selectedProduct.description}
          country={select.selectedProduct.madeIn.title}
          cat={select.selectedProduct.category.title}
          year={select.selectedProduct.edition}
          price={select.selectedProduct.price}
          lang={select.lang}
          onAdd={() => callbacks.addToBasket(id)}
        />
      ) : (
        <div>Loading...</div>
      )}
    </PageLayout>
  );
};

export default memo(Product);
