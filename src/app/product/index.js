import React, {memo, useCallback, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import ProductProperties from "../../components/product-properties";
import Basket from "../basket";

import { Await, defer, useLoaderData } from 'react-router-dom';

function Product() {

  const data = useLoaderData();

  const store = useStore();

  const fLoadProduct = (item) => {
    item.then((result) => 
    {
      store.actions.basket.loadProduct(
      result.result._id,
      result.result.title,
      result.result.description,
      result.result.madeIn.title + ' (' + result.result.madeIn.code + ')',
      result.result.category.title,
      result.result.edition,
      result.result.price
      )
      //store.actions.basket.setIdProduct(result.result._id);
    }
    )
  }

  useEffect(() => {
    fLoadProduct(data.jsonItem);
  }, [data]);

  const select = useSelector((state) => ({
    product: state.basket.product,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    variablesLanguage: state.lingua.variablesLanguage,
  }));

  

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id,1), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      document.body.style.overflow = "hidden";
      store.actions.modals.open('basket');
    }, [store]),
  }

  const activeModal = useSelector((state) => {return(state.modals.name)});

  return (
    <>
    {(store.actions.lingua.getState().Language == 'null' ? store.actions.lingua.setVariable('ru-RU') : '')}
    <main>
    <PageLayout>
      <React.Suspense
        fallback={<p>Loading...</p>}
      >
        <Await
          resolve={data.jsonItem}
          errorElement={
            <p>Error loading!</p>
          }
        >
          <ProductProperties product={select.product}
                             onOpen={callbacks.openModalBasket}
                             amount={select.amount}
                             sum={select.sum}
                             main={select.variablesLanguage.BasketTool.main}
                             label={select.variablesLanguage.BasketTool.label}
                             buttonBasket={select.variablesLanguage.BasketTool.buttonBasket}
                             one={select.variablesLanguage.BasketTool.product.one}
                             few={select.variablesLanguage.BasketTool.product.few}
                             many={select.variablesLanguage.BasketTool.product.many}
                             empty={select.variablesLanguage.BasketTool.empty}
                             addToBasket={callbacks.addToBasket}
                             madeIn={select.variablesLanguage.Page2.madeIn}
                             category={select.variablesLanguage.Page2.category}
                             edition={select.variablesLanguage.Page2.edition}
                             price={select.variablesLanguage.Page2.price}
                             buttonAddProduct={select.variablesLanguage.buttonAddProduct}/>
        </Await>
      </React.Suspense>
    </PageLayout>
    </main>
    {(activeModal === 'basket' && <Basket/>)}
    </>
  );
}

export default memo(Product);

export const ProductLoader = async ({params}) => {
  const item = loadProductToAsyncById(params._id);
  return defer({ jsonItem: item });
};

export async function loadProductToAsyncById(_id) {
  const vRequest = `/api/v1/articles/${_id}?fields=_id,title,description,edition,price,madeIn(title,code),category(title)`;
  const response = await fetch(vRequest);
  return response.json();
}