import { memo, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from '../store/use-store';
import PageLayout from '../components/page-layout';
import Head from '../components/head';
import BasketTool from '../components/basket-tool';
import Description from '../description';
import Button from '../components/button';
import { generateProductApiUrl, getApiData } from '../utils';
import { useParams } from "react-router";
import { BASE_URL, STRINGS } from '../const';
import { useAppContext } from '../app-context';

function Product() {
  const { _id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setHeaderTitle, basket, language } = useAppContext();
  const cn = bem('Product');

  // TODO: убрать дву функции, дублирует utils
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await getApiData(generateProductApiUrl(BASE_URL, _id));
        setResult(data.result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [_id]);

  useEffect(() => {
    setHeaderTitle(result?.title);
  }, [result]);

  const callbacks = {
    onAdd: () => {
      basket.addToBasket(_id);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!result) return <div>No data found</div>;

  return (
    <PageLayout>
      <div className={cn()}>
        <div className={cn('description')}>
          {result.description ? `${result.description}` : 'No description'}
        </div>
        <Description
          country={result.madeIn.title} 
          category={result.category.title}
          year={result.edition}
          price={result.price}
        />
        <Button style="primary" onClick={callbacks.onAdd} title={STRINGS.ADD[language]} />
      </div>
    </PageLayout>
  );
}

export default memo(Product);
