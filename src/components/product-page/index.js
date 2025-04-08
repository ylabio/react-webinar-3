import { memo } from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import BasketTool from '../basket-tool';
import PageLayout from '../page-layout';
import ProductDetails from '../product-details';

function ProductPage({ product, isLoading, error, amount, sum, onAdd, onOpenBasket, texts = {} }) {
  return (
    <PageLayout>
      <Head title={product?.title || 'Товар'} />
      <BasketTool
        onOpen={onOpenBasket}
        amount={amount}
        sum={sum}
        textone={texts.one}
        textfew={texts.few}
        textmany={texts.many}
        textEmpty={texts.Empty}
        textmain={texts.main}
      />

      {isLoading ? (
        <div>Загружаем информацию о товаре...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : product ? (
        <ProductDetails texts={texts} item={product} onAdd={onAdd} />
      ) : (
        <div>Товар не найден</div>
      )}
    </PageLayout>
  );
}

ProductPage.propTypes = {
  product: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  amount: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onOpenBasket: PropTypes.func.isRequired,
};

export default memo(ProductPage);
