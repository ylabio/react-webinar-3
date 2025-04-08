import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { NavLink, useParams } from 'react-router';
import Button from '../../components/button';
import './style.css';
import ItemLayout from '../../components/item-layout';

const ItemPage = () => {
  const store = useStore();
  const { amount, sum } = useSelector(state => state.basket);
  const [item, setItem] = useState({});

  let { id } = useParams();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
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
  }, [id]);

  return (
    <PageLayout>
      <Head title={item?.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={amount} sum={sum} >
        <NavLink className={"nav-link"} to={'/articles'}>Главная</NavLink>
      </BasketTool>
      <ItemLayout description={item?.description} title={item?.title} category={item?.category?.title} price={item?.price} onAddToBasket={callbacks.addToBasket} />
    </PageLayout>
  );
};

export default ItemPage;
