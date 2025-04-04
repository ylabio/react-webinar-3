import React, { useCallback, useEffect } from 'react';
import PageLayout from '../page-layout';
import Head from '../head';
import Controls from '../controls';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import NavBar from '../nav-bar';
function Product() {

  const { id } = useParams();
  const store = useStore();

  const product = useSelector(state => state.catalog.current);

  useEffect(() => {
    store.actions.catalog.loadItem(id);
  }, [id]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(product => store.actions.basket.addToBasket(product), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    
  };

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
  }));

  if (!product || typeof product !== 'object') {
    return <PageLayout head={<Head title='Загрузка...' />}></PageLayout>;
  }

  return (
    
    <PageLayout
      head={<Head title={product.title} />}
    >
      
      <article className='product'>
      <NavBar onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        <p className="product__description">{product.description}</p>

        <div className='prodict__info'>
          <dl className="product__properties">
            <dt className="product__property-label">Страна производитель:</dt>
            <dd className="product__property-value"><b>{product.madeIn?.title || '—'}</b></dd>

            <dt className="product__property-label">Категория:</dt>
            <dd className="product__property-value"><b>{product.category?.title || '—'}</b></dd>

            <dt className="product__property-label">Год выпуска:</dt>
            <dd className="product__property-value"><b>{product.edition}</b></dd>
          </dl>
        </div>

        <div className="product__price">{`Цена: ${product.price} ₽`}</div>
        <Controls onAdd={() => callbacks.addToBasket(product)} />
      </article>
    </PageLayout>
  )
}

export default Product;