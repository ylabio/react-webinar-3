import {memo, useCallback} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import ArticleCard from '../../components/article-card';
import {useSelector} from 'react-redux';
import shallowequal from 'shallowequal';

function ArticleCardMain() {
  const store = useStore();

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
  );
}

export default memo(ArticleCardMain);
