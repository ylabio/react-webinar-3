import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProductTool from '../../components/product-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router';
import ProductInfo from '../../components/product-info';

function Product() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    // store.actions.catalog.getProduct(id);
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
  // console.log('list', select);

  // const selectedProduct = useSelector(state => 
  //   state.catalog.selectedProduct
  // );
  // console.log('selectedProduct', select.selectedProduct, select.selectedProduct.price); // undefined
  // console.log('Price:', select.selectedProduct?.price);
  // console.log(selectedProduct.description);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(id => store.actions.basket.addToBasket(id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  // const renders = {
  //   item: useCallback(
  //     item => {
  //       return <Item item={item} onAdd={callbacks.addToBasket} />;
  //     },
  //     [callbacks.addToBasket],
  //   ),
  // };

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
      <ProductTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />

      {select.selectedProduct ? (
        <ProductInfo
          _id={select.selectedProduct._id}
          desc={select.selectedProduct.description}
          country={select.selectedProduct.madeIn.title}
          cat={select.selectedProduct.category.title}
          year={select.selectedProduct.edition}
          price={select.selectedProduct.price}
          onAdd={() => callbacks.addToBasket(id)}
          list={select.list}
        />
      ) : (
        <div>Loading...</div>
      )}
      
    </PageLayout>
  );
};

export default memo(Product);
