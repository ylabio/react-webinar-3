import React, { memo, useState, useEffect, useCallback, useContext } from 'react';
import { numberFormat } from '../../utils';
import { useParams } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import Button from '../../components/button';
import './style.css';
import LanguageContext from '../../components/language-provider';
import Loader from '../../components/loader';
import NotFound from '../../components/not-found';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { language, translations } = useContext(LanguageContext);

  const store = useStore();

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(
          `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title),editon`
        );
        const data = await response.json();
        setItem(data.result);
        
        store.actions.catalog.setOne(data.result);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id, store]);
  

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const addToBasket = useCallback(
    _id => store.actions.basket.addToBasket(_id),
    [store]
  );

  const openModalBasket = useCallback(
    () => store.actions.modals.open('basket'),
    [store]
  );

  if (loading) {
    return(
      <Loader/>
    );
  }

  if (!item) {
    return(
      <>
        <Head />
        <NotFound />
      </>
  
    );
  }

  return (
    <PageLayout>
      <Head title={item.title} />
      <BasketTool onOpen={openModalBasket} amount={select.amount} sum={select.sum} />
      <div className="ItemDetail">
        <p className="ItemDetail__description">
          {item.description || 'Нет описания'}
        </p>
        <div className="ItemDetail__info">
          <div className="ItemDetail__label">{translations[language].countryDev}:</div>
          <div className="ItemDetail__value">{item.madeIn?.title} ({item.madeIn?.code})</div>

          <div className="ItemDetail__label">{translations[language].productCat}:</div>
          <div className="ItemDetail__value">{item.category?.title}</div>

          <div className="ItemDetail__label">{translations[language].productDevDate}:</div>
          <div className="ItemDetail__value">{item.edition}</div>
        </div>

        <div className="ItemDetail__price">
          <strong>{translations[language].productPrice}: {numberFormat(item.price)} ₽</strong>
        </div>
        <Button
          style="primary"
          onClick={() => addToBasket(item._id)}
          title={translations[language].addButton}
        />
      </div>
    </PageLayout>
  );
}

export default memo(ItemDetail);
