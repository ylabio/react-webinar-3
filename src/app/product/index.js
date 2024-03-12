import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import { memo, useState, useEffect, useCallback } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import { numberFormat } from '../../utils';
import './style.css'
import { UI_TEXTS } from '../../consts/content';

const Product = () => {
  const store = useStore();
  const [isContentFetched, setIsContentFetched] = useState(false)
  const [content, setContent] = useState({})
  let { productId } = useParams()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLanguage
  }));

  useEffect(() => {
    const fetchProductContent = async () => {
      const content = await store.actions.catalog.loadProductContent(productId, select.language);
      setContent(content)
      setIsContentFetched(true)
    }
    fetchProductContent()
  }, [productId, select.language]);

  const uiText = {
    madeIn: UI_TEXTS[select.language].product.mainContent.madeIn,
    category: UI_TEXTS[select.language].product.mainContent.category,
    edition: UI_TEXTS[select.language].product.mainContent.edition,
    price: UI_TEXTS[select.language].product.mainContent.price,
    addItemBtn: UI_TEXTS[select.language].product.mainContent.addItemBtn,
  }

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
            <p>{uiText.madeIn}: <span>{content.madeIn && `${content.madeIn.title} (${content.madeIn.code})`}</span>
            </p>
            <p>{uiText.category}: <span>{content.category && content.category.title}</span></p>
            <p>{uiText.edition}: <span>{content.edition}</span></p>
            <p className="Product-price">{uiText.price}: {numberFormat(content.price, 'ru-RU', {
              style: 'currency',
              currency: 'RUB',
            })}</p>
            <button onClick={callbacks.addToBasket}>{uiText.addItemBtn}</button>
          </article>
        </>
      )}
    </>
  );
};

export default memo(Product);