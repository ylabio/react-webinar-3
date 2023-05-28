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

const cn = bem("Product");

function Product() {
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {id} = useParams(); 

  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);

  const language = useSelector(state => state.language.language);
  const label = language === 'RU' ? languageConfig.add.rus : languageConfig.add.eng;

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
      <PageLayout>
        {isLoading && <div className='Loader-wrapper'><Loader /></div>}
        {isLoading == false 
        && 
        <>
          <Head title={productData.title}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
          <div className={cn()}>
            <div className={cn("item")}>{productData.description}</div>
            <div className={cn("item")}>
              <span className={cn("item-title")}>Страна производитель:</span>
              <span className={cn("item-description")}>{`${productData?.madeIn?.title}`}</span>
            </div>
            <div className={cn("item")}>
              <span className={cn("item-title")}>Категория:</span> 
              <span className={cn("item-description")}>{productData?.category?.title}</span>
            </div>
            <div className={cn("item")}>
              <span className={cn("item-title")}>Год выпуска: </span>
              <span className={cn("item-description")}>{productData?.edition}</span>
            </div>
            <div className={cn("item")}>{`Цена: ${productData?.price}`}</div>
            <button type='button' onClick={() => callbacks.addToBasket('64725404fe34660a6541fcaa')}>{label}</button>
          </div>
        </>
        }
      </PageLayout>
    </div>
  );
}

export default memo(Product);
