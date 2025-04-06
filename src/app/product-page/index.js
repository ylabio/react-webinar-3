import { memo, useEffect, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../../components/button'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'
import { useParams } from 'react-router'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import BasketTool from '../../components/basket-tool'
import { numberFormat } from '../../utils'

function ProductPage() {
  const cn = bem('Product');
  const params = useParams()
  const store = useStore()


  useEffect(() => {
    store.actions.catalog.loadProduct(params.id)
  }, [])

  const select = useSelector(state => ({
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
    }));

  const selectedProduct = useSelector(state => {
    const selectedProduct = state.catalog.selectedProduct;

    if (!selectedProduct) return {}
    
    return {
    productId: selectedProduct._id,
    title: selectedProduct.title,
    description: selectedProduct.description,
    edition: selectedProduct.edition,
    price: selectedProduct.price,
    madeInTitle: selectedProduct.madeIn.title,
    madeInCode: selectedProduct.madeIn.code,
    category: selectedProduct.category.title,
    }
  })
  
  const callbacks = {
      // Добавление в корзину
      addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
      // Открытие модалки корзины
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    };

  return (
    <PageLayout>
      <Head title={selectedProduct.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      
      {!selectedProduct.productId 
        ? (<h2>LOADING</h2>)
        : (
          <div className={cn()}>
          <div className={cn('description')}>
          <p>
            {selectedProduct.description}
          </p> 
        </div>
        <div className={cn('info')}>
          <div className={cn('features')}>
            <div>Страна производитель:</div>
            <div>Категория:</div>
            <div>Год выпуска:</div>
          </div>
          <div className={cn('values')}>
            <div>{`${selectedProduct.madeInTitle} (${selectedProduct.madeInCode})`}</div>
            <div>{selectedProduct.category}</div>
            <div>{selectedProduct.edition}</div>
          </div>
        </div>
        <div className={cn('price')}>
          Цена:  {numberFormat(selectedProduct.price)} ₽
        </div>
        <Button 
          style="primary" 
          onClick={() => callbacks.addToBasket(selectedProduct.productId)} 
          title="Добавить" />
        </div>
        )
      }      
    
    </PageLayout>
  );
}

export default memo(ProductPage);
