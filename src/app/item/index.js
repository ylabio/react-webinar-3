import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { useParams } from 'react-router';
import Button from '../../components/button';

const ItemPage = () => {
  const store = useStore();
  const { amount, sum } = useSelector(state => state.basket);
  const [item, setItem] = useState({});

  let { id } = useParams();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const json = await response.json();
        setItem(json.result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <PageLayout>
      <Head title={item?.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={amount} sum={sum} />
      <div>{item?.description}</div>
      <div>
        <label>Страна производитель:</label>
        <span>{item?.madeIn?.title}</span>
      </div>
      <div>
        <label>Категория:</label>
        <span>{item?.category?.title}</span>
      </div>
      <div>
        <label>Год выпуска:</label>
        <span>{item?.edition}</span>
      </div>
      <h3>Цена: {item?.price}</h3>
      <Button style={'primary'} onClick={()=>{}} title={'Добавить'} type={'button'} />
    </PageLayout>
  );
};

export default ItemPage;