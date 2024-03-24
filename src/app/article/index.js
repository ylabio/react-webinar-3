import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector} from 'react-redux';
import useSelectorStore from '../../hooks/use-selector'
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from "../../store-redux/comments/actions";
import commentReplierActions from "../../store-redux/comment-replier/actions";
import CommentsList from "../../components/comments-list";
import listToTree from "../../utils/list-to-tree";
import CommentReplier from "../../containers/comment-replier";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id))
    dispatch(commentsActions.load(params.id))
    dispatch(commentReplierActions.setArticle(params.id))
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    count: state.comments.count,
    waitingComments: state.comments.waiting,
    replierActive: state.commentReplier.active
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectStore = useSelectorStore(state => ({
    user: state.session.user._id
  }))

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    setReplierComment: useCallback(id => dispatch(commentReplierActions.setComment(id)), [])
  }

  const listData = useMemo(() => ([
    ...listToTree(select.comments, '_id', 'comments')
  ]), [select.comments]);


  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={select.waitingComments}>
        <CommentsList list={listData} count={select.count}
                      nest={0} user={selectStore.user}
                      replierActive={select.replierActive} setReplierComment={callbacks.setReplierComment} />
      </Spinner>
      {select.replierActive === params.id && <CommentReplier parent={'article'}/>}
    </PageLayout>
  );
}

export default memo(Article);
