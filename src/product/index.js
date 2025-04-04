import { memo, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PageLayout from '../components/page-layout';
import Description from '../description';
import Button from '../components/button';
import { generateProductApiUrl, getApiData } from '../utils';
import { useParams } from "react-router";
import { BASE_URL, STRINGS } from '../const';
import { useAppContext } from '../app-context';

function Product() {
  const { _id } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setHeaderTitle, basket, language } = useAppContext();
  const cn = bem('Product');

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

  useEffect(() => {
    setHeaderTitle(result?.title);
  }, [result]);

  const callbacks = {
    onAdd: () => {
      basket.addToBasket(_id);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!result) return null;

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
