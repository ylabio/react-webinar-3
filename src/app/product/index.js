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

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    store.actions.catalog.getProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    selectedProduct: state.catalog.selectedProduct
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  const renders = {
    tool: useCallback(
      () => {
        return <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />;
      },
      [select.sum],
    ),
  };

  // const postsPerPage = 10;
  // const currentPage = 1;
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // const totalPosts = select.count;
  // console.log(totalPosts);
  
  return (
    <PageLayout>
      <Head title={select.selectedProduct?.title} />
      <Navbar path='/' renderBasket={renders.tool} />

      {select.selectedProduct ? (
        <ProductInfo
          // _id={select.selectedProduct._id}
          desc={select.selectedProduct.description}
          country={select.selectedProduct.madeIn.title}
          cat={select.selectedProduct.category.title}
          year={select.selectedProduct.edition}
          price={select.selectedProduct.price}
          onAdd={() => callbacks.addToBasket(id)}
          // list={select.list}
        />
      ) : (
        <div>Loading...</div>
      )}
      
    </PageLayout>
  );
};

export default memo(Product);
