import { memo, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from '../store/use-store';
import PageLayout from '../components/page-layout';
import Head from '../components/head';
import BasketTool from '../components/basket-tool';
import { generateProductApiUrl, getApiData } from '../utils';
import { useParams } from "react-router";
import { BASE_URL } from '../const';
import { useAppContext } from '../app-context';
import './style.css';

function Product() {
  const { _id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setHeaderTitle } = useAppContext();

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!result) return <div>No data found</div>;

  return (
    <PageLayout>
      {result._id ? `Product ID: ${result._id}` : 'No product ID'}
    </PageLayout>
  );
}

export default memo(Product);
