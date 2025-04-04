import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Button from '../../components/button';
import { numberFormat } from '../../utils';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

function Article() {
  const cn = bem('Article');
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.loadArticle(id);
  }, [id]);

  const select = useSelector(state => ({
    article: state.catalog.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (!select.article) {
    return (
      <PageLayout>
        <Head title="Загрузка..." />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <div className={cn()}>
          <div className={cn('content')}>
            <div>Загрузка...</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const { article } = select;

  return (
    <PageLayout>
      <Head title={article.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <div className={cn()}>
        <div className={cn('content')}>
          <div className={cn('description')}>{article.description}</div>
          <div className={cn('info')}>
            <div className={cn('infoItem')}>
              <div className={cn('infoItem-label')}>Страна производитель:</div>
              <div className={cn('infoItem-value')}>{article.madeIn?.title || 'Не указано'}</div>
            </div>
            <div className={cn('infoItem')}>
              <div className={cn('infoItem-label')}>Категория:</div>
              <div className={cn('infoItem-value')}>{article.category?.title || 'Не указано'}</div>
            </div>
            <div className={cn('infoItem')}>
              <div className={cn('infoItem-label')}>Год выпуска:</div>
              <div className={cn('infoItem-value')}>{article.year || 'Не указано'}</div>
            </div>
          </div>
          <div className={cn('price')}>Цена: {numberFormat(article.price)} ₽</div>
          <Button
            title="Добавить"
            onClick={() => callbacks.addToBasket(article._id)}
            style="primary"
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default memo(Article);
