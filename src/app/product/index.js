import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { memo, useState, useEffect, useCallback } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import ProductContent from '../../components/product-content';
import Menu from '../../components/menu';

const Product = () => {
  const store = useStore();
  const [isContentFetched, setIsContentFetched] = useState(false)
  const [content, setContent] = useState({})
  let { productId } = useParams()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    modalStatus: state.modals.name,
    language: state.language
  }));

  useEffect(() => {
    const fetchProductContent = async () => {
      const currentLanguage = document.documentElement.lang;
      const content = await store.actions.product.loadProductContent(productId, currentLanguage);
      setContent(content)
      setIsContentFetched(true)
    }
    fetchProductContent()
  }, [productId, select.language.currentLanguage]);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(() => store.actions.basket.addToBasket(productId), [store]),
    setLanguage: useCallback((language) => {
      store.actions.language.setLanguage(language)
    }, [store]),
  }

  return (
    <PageLayout modalStatus={select.modalStatus}>
      {isContentFetched && (
        <>
          <Head title={content.title} languageState={select.language} onChangeLang={callbacks.setLanguage}/>
          <Menu onOpen={callbacks.openModalBasket} amount={select.amount}
                      sum={select.sum}/>
          <ProductContent content={content} onAdd={callbacks.addToBasket} />
        </>
      )}
    </PageLayout>
  );
};

export default memo(Product);