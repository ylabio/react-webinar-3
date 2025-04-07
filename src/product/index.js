import { memo, useEffect, useState, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import PageLayout from '../components/page-layout';
import Description from '../description';
import Button from '../components/button';
import Head from '../components/head';
import BasketTool from '../components/basket-tool';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { generateProductApiUrl, getApiData } from '../utils';
import { useParams } from "react-router";
import { BASE_URL, STRINGS } from '../const';
import { useAppContext } from '../app-context';

function Product({
  _id,
  language,
  texts,
}) {
  const store = useStore();
  // const { _id } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setHeaderTitle, basket } = useAppContext();
  const cn = bem('Product');

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(generateProductApiUrl(BASE_URL, _id));
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setResult(data.result);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [_id]);

  // useEffect(() => {
  //   setHeaderTitle(result?.title);
  // }, [result]);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangeLanguage: useCallback(() => store.actions.catalog.changeLanguage(), [store]),
    onAdd: () => {
      basket.addToBasket(_id);
    }
  };

  console.log(texts);

  if (error) return <div>Error: {error}</div>;
  if (!result) return null;

  return (
    <PageLayout>
      <Head
        title={result.title}
        changeLanguage={callbacks.onChangeLanguage}
        switchLanguage={texts.switchLanguage}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        home={texts.home}
        empty={texts.empty}
        products={texts.products}
        language={language}
      />
      <div className={cn()}>
        <div className={cn('description')}>
          {result.description ? `${result.description}` : 'No description'}
        </div>
        <Description
          country={result.madeIn.title} 
          category={result.category.title}
          year={result.edition}
          price={result.price}
          texts={texts}
          language={language}
        />
        <Button style="primary" onClick={callbacks.onAdd} title={texts.addButtonText} />
      </div>
    </PageLayout>
  );
}

export default memo(Product);
