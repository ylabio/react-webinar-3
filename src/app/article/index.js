import {memo, useCallback, useState} from 'react';
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
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import CommentsBlock from "../../components/comments-block";
import useSelector from "../../hooks/use-selector";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";


function Article() {

  const store = useStore();
  const [showFormId, setShowFormId] = useState(null)
  const loggedUserId = useSelector(state => state.session.user._id)
  const loggedIn = useSelector(state => state.session.user._id)


  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
  }, [dispatch]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект


  const sortedList = treeToList(listToTree(Object.values(select.comments)), (item, level) => (
    {_id: item._id, text: item.text, level: level, dateCreate: item.dateCreate, author: item.author}
  )).filter(item => item._id !== undefined);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onComment: useCallback((text) => dispatch(commentsActions.addComment(text, params.id)), []),
    onAnswer: useCallback((text, _id) => dispatch(commentsActions.addAnswer(text, _id)), []),


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
        <CommentsBlock onAnswer={callbacks.onAnswer} onComment={callbacks.onComment} comments={sortedList}
                       loggedIn={loggedIn}  loggedUserId={loggedUserId}
                       showFormId={showFormId} setShowFormId={setShowFormId}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
