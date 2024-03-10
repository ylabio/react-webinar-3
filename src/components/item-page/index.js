import React, {useCallback, useEffect, useState} from 'react';
import './style.css'
import PageLayout from "../page-layout";
import Head from "../head";
import {Link, useParams} from "react-router-dom";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {numberFormat} from "../../utils";

const ItemPage = () => {
  const {id} = useParams()

  const store = useStore()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const [item, setItem] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
      const json = await res.json()

      setItem(json.result)
    }

    fetchData()
  }, [id])

  return (
    <div className='ItemPage'>
      <PageLayout>
        <Head title={item?.title} />
        <div className='ItemPage-tools'>
          <Link to={'/'} className='ItemPage-link'>
            Главная
          </Link>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
        </div>
        <div className='ItemPage-body'>
          <div className='ItemPage-desc'>
            {item?.description}
          </div>
          <div className='ItemPage-made'>
            Страна производитель: <b>{item?.madeIn.title} ({item?.madeIn.code})</b>
          </div>
          <div className='ItemPage-cat'>
            Категория: <b>{item?.category.title}</b>
          </div>
          <div className='ItemPage-year'>
            Год выпуска: <b>{item?.edition}</b>
          </div>
          <div className='ItemPage-price'>
            Цена: {numberFormat(item?.price)} ₽
          </div>
          <button
            className='ItemPage-btn'
            onClick={() => callbacks.addToBasket(item?._id)}>
            Добавить
          </button>
        </div>
      </PageLayout>
    </div>
  );
};

export default React.memo(ItemPage);
