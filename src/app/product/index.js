import { memo, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';
import { numberFormat } from '../../utils';
import Button from '../../components/button';
import BasketTool from '../../components/basket-tool';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/language-context';
import { translations } from '../../locales';

function ProductPage() {
  const cn = bem('ProductPage');
  const { id } = useParams();
  const store = useStore();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Загружаем данные товара
  useEffect(() => {
    store.actions.catalog.loadProduct(id);
  }, [id, store]);

  const product = useSelector(state => state.catalog.currentProduct);
  const waiting = useSelector(state => state.catalog.waiting);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(
      event => {
        event.preventDefault();

        if (product && product.price) {
          store.actions.basket.addToBasket(id);
        } else {
          console.error('Товар не найден или не имеет цены');
        }
      },
      [store, id, product],
    ),

    openModalBasket: useCallback(() => {
      store.actions.modals.open('basket');
    }, [store]),
  };

  // Если товар еще загружается, показываем индикатор загрузки
  if (waiting) return <div className={cn('loading')}>Загрузка...</div>;

  // Если товар не найден, показываем ошибку
  if (!product) return <div className={cn('error')}>Товар не найден</div>;

  return (
    <PageLayout>
      <Head title={product.title} />
      <div className={cn()}>
        <div className={cn('breadcrumbs')}>
          <Link to="/" className={cn('breadcrumb-link')}>
            {t.startPageLink}
          </Link>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        </div>

        <div className={cn('content-wrapper')}>
          {/* Блок описания товара */}
          {product.description && (
            <div className={cn('description')}>
              <h3>{t.descriptionProduct}</h3>
              <p>{product.description}</p>
            </div>
          )}

          {/* Блок с деталями товара (страна, категория, год) */}
          <div className={cn('details')}>
            <div className={cn('detail-row')}>
              <span>{t.madeIn}</span>
              <span>{product.madeIn?.title || 'Не указана'}</span>
            </div>
            <div className={cn('detail-row')}>
              <span>{t.categoryProduct}</span>
              <span>{product.category?.title || 'Не указана'}</span>
            </div>
            <div className={cn('detail-row')}>
              <span>{t.YearOfManufacture}</span>
              <span>{product.edition?.title || 'Не указан'}</span>
            </div>
          </div>

          {/* Блок с ценой и кнопкой "Добавить в корзину" */}
          <div className={cn('content')}>
            <div className={cn('price')}>{numberFormat(product.price)} ₽</div>
          </div>

          <Button
            className={cn('actions')}
            onClick={callbacks.addToBasket}
            title={t.addToCart}
            style="primary"
          />
        </div>
      </div>
    </PageLayout>
  );
}

ProductPage.propTypes = {
  // Пропсы, если будут передаваться
};

export default memo(ProductPage);
