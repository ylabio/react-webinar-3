import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import MainMenu from '../../components/main-menu';
import MainNav from '../../components/main-nav';
import BasketTool from "../../components/basket-tool";

// import useStore from "../../store/use-store";
// import useSelector from "../../store/use-selector";

function Product() {
  let { productId } = useParams();
  console.log(productId)
  // const store = useStore();

  // useEffect(() => {
  //   store.actions.catalog.load();
  // }, []);

  // const select = useSelector(state => ({
  //   list: state.catalog.list,
  //   amount: state.basket.amount,
  //   sum: state.basket.sum
  // }));

  return (
    <PageLayout>
      <Head title='#$%^^&&***('/>
      <MainMenu>
        <MainNav />
        <BasketTool />
      </MainMenu>
      <h1>Product</h1>
    </PageLayout>
  );
}

export default memo(Product);
