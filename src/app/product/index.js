import { memo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import { numberFormat } from '../../utils';
import './style.css';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/v1/articles/${id}`);
      const json = await response.json();
      setProduct(json.result);
    };
    load();
  }, [id]);

  if (!product) {
    return (
      <PageLayout>
        <div>Загрузка...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Head title={product.title} />
      <div className="Product">
        <Link to="/" className="Product-back">
          ← Главная
        </Link>
        <h2 className="Product-title">{product.title}</h2>
        <div className="Product-price">{numberFormat(product.price)} ₽</div>
        <div className="Product-description">{product.description || 'Нет описания'}</div>
      </div>
    </PageLayout>
  );
}

export default memo(Product);
