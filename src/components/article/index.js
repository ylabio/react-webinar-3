import { memo, useCallback, useEffect } from 'react';
import './style.css';
import { Link, useParams } from 'react-router';
import PageLayout from '../page-layout';
import Head from '../head';
import BasketTool from '../basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Basket from '../../app/basket';
import ArticleContent from '../article-content';
import { Paths } from '../../routes/paths';
import { cn as bem } from '@bem-react/classname';

function Article() {
  const store = useStore();
  const cn = bem('Article');
  const { id } = useParams();

  useEffect(() => {
    store.actions.article.getArticleById(id);
    store.actions.modals.open(null);
  }, [id]);

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article.article,
    activeModal: state.modals.name,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Название товара" />
        <div className={cn()}>
          <div className={cn('title')}>
            <Link className={cn('link')} to={Paths.MAIN}>
              Главная
            </Link>
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
          </div>
          <ArticleContent article={select.article} addToBasket={callbacks.addToBasket} />
        </div>
      </PageLayout>
      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Article);
