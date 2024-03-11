import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { memo, useState, useEffect, useCallback } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { Outlet, useParams } from 'react-router-dom';
import { numberFormat } from '../../utils';
import './style.css'

const Product = () => {
  const store = useStore();
  const [isContentFetched, setIsContentFetched] = useState(false)
  const [content, setContent] = useState({})
  let { productId } = useParams()

  useEffect(() => {
    const fetchProductContent = async () => {
      const content = await store.actions.catalog.loadProductContent(productId);
      setContent(content)
      setIsContentFetched(true)
    }
    fetchProductContent()
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(() => store.actions.basket.addToBasket(productId), [store]),
  }

  return (
    <>
      {isContentFetched && (
        <>
          <Head title={content.title}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                      sum={select.sum}/>
          <article>
            <p>{content.description}</p>
            <p>Страна изготовитель: <span>{content.madeIn && `${content.madeIn.title} (${content.madeIn.code})`}</span>
            </p>
            <p>Категория: <span>{content.category && content.category.title}</span></p>
            <p>Год выпуска: <span>{content.edition}</span></p>
            <p className="Product-price">Цена: {numberFormat(content.price, 'ru-RU', {
              style: 'currency',
              currency: 'RUB',
            })}</p>
            <button onClick={callbacks.addToBasket}>Добавить</button>
          </article>
        </>
      )}
    </>
  );
};

export default memo(Product);