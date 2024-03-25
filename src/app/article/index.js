import {memo, useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';
import {recurseList} from '../../utils/recurse-list';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/load/actions';
import createCommentActions from '../../store-redux/comments/create/actions';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import Comments from "../../components/comments";

function Article() {

  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();
  const {t} = useTranslate();

  const {exists, token} = useSelector(state => state.session);
  const [commentValue, setCommentValue] = useState('');

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    count: state.comments.count,
    items: state.comments.items,
    success_create: state.create_comment.success_create,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  useInit(async () => {
    await Promise.all([
      dispatch(articleActions.load(params.id)),
      dispatch(commentsActions.load(params.id)),
    ])
  }, [params.id, select.success_create]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Создание нового комментария
    createNewComment: useCallback(() => {
      if (commentValue.trim()) {
        dispatch(createCommentActions.createComment(token, {text: commentValue, parent: {_id: params.id, _type: "article"}}));
        setCommentValue('');
      }
    }, [token, commentValue, params.id]),
    // Ответ на комментарий
    onReplyComment: useCallback((_id) => {
      if (commentValue.trim()) {
        dispatch(createCommentActions.createComment(token, {text: commentValue, parent: {_id, _type: "comment"}}));
        setCommentValue('');
      }
    }, [token, commentValue])
  }

  const options = {
    comments: recurseList(select.items, params.id),
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
        <Comments 
          count={select.count} list={options.comments} exists={exists} 
          commentValue={commentValue} setCommentValue={setCommentValue} 
          createNewComment={callbacks.createNewComment} 
          replyComment={callbacks.onReplyComment} t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
