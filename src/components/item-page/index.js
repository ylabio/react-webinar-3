import React, {useCallback, useEffect, useState} from 'react';
import './style.css'
import PageLayout from "../page-layout";
import Head from "../head";
import {Link, useParams} from "react-router-dom";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {numberFormat} from "../../utils";
import {lang as langData} from '../../lang/data'
import LangSelect from "../lang-select";

const ItemPage = () => {
  const {id} = useParams()

  const store = useStore()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const lng = select.lang === 'ru' ? {
    toHome: langData.headers.toHome.ru,
    country: langData.itemPage.country.ru,
    category: langData.itemPage.category.ru,
    year: langData.itemPage.year.ru,
    price: langData.itemPage.price.ru,
    btn: langData.buttons.add.ru
  } : {
    toHome: langData.headers.toHome.en,
    country: langData.itemPage.country.en,
    category: langData.itemPage.category.en,
    year: langData.itemPage.year.en,
    price: langData.itemPage.price.en,
    btn: langData.buttons.add.en
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
        <div style={{position: "relative"}}>
          <Head title={item?.title} inItemPage />
          <LangSelect lang={select.lang} />
        </div>
        <div className='ItemPage-tools'>
          <Link to={'/'} className='ItemPage-link'>
            {lng.toHome}
          </Link>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            lang={select.lang}
          />
        </div>
        <div className='ItemPage-body'>
          <div className='ItemPage-desc'>
            {item?.description}
          </div>
          <div className='ItemPage-made'>
            {lng.country}: <b>{item?.madeIn.title} ({item?.madeIn.code})</b>
          </div>
          <div className='ItemPage-cat'>
            {lng.category}: <b>{item?.category.title}</b>
          </div>
          <div className='ItemPage-year'>
            {lng.year}: <b>{item?.edition}</b>
          </div>
          <div className='ItemPage-price'>
            {lng.price}: {numberFormat(item?.price)} ₽
          </div>
          <button
            className='ItemPage-btn'
            onClick={() => callbacks.addToBasket(item?._id)}>
            {lng.btn}
          </button>
        </div>
      </PageLayout>
    </div>
  );
};

export default React.memo(ItemPage);
