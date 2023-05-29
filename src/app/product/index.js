import {memo, useCallback, useEffect, useState} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Loader from '../../components/loader';
import BasketTool from '../../components/basket-tool';
import Basket from '../basket';
import { fetchData } from '../../api';
import { languageConfig } from '../../languages';
import ProductInfo from '../../components/productInfo';

function Product() {
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {id} = useParams(); 

  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  useEffect(() => {
   (async () => {
      const result = await fetchData(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      setProductData(result);
      setIsLoading(false);
    })()     
  }, [])

  return (
    <div>
      {isLoading && <div className='Loader-wrapper'><Loader /></div>}
      <PageLayout>
        {isLoading == false && 
          <>
            <Head title={productData.title}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            <ProductInfo 
              addToBasket={callbacks.addToBasket} 
              description={productData.description} 
              country={productData?.madeIn?.title} 
              category={productData?.category?.title}
              price={productData?.price}
              year={productData?.edition}
              id={productData?._id}
            />
          </>
        }
      </PageLayout>
    </div>
  );
}

export default memo(Product);
