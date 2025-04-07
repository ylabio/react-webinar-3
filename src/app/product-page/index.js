import { memo, useCallback, useEffect } from 'react';
import { useParams, useLoaderData} from 'react-router-dom'; // Добавляем useParams
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Product from '../../components/product';
import HomeLink from '../../components/home-link';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

export async function loader({ params }) {
  const response = await fetch(
    `/api/v1/articles/${params.id}?fields=*,madeIn(title,code),category(title)`
  );
  if (!response.ok) throw new Error("Товар не найден");
  return await response.json();
}

function ProductPage() {

  // const { id } = useParams();
  const product = useLoaderData().result;
  const store = useStore();

  useEffect(() => {
    callbacks.closeModal();
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  console.log(product);

  return (
    <PageLayout>
      <Head title={product?.title || 'Товар'} />
      <HomeLink />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {product && (
        <Product
          price={product.price}
          description={product.description}
          madeIn={product.madeIn.title}
          category={product.category.title}
          edition={product.edition}
          onAdd={() => callbacks.addToBasket(product._id)}
        />
      )}
    </PageLayout>
  );
}

export default memo(ProductPage);
