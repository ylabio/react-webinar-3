import { memo, useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import CommentList from '../../components/comment-list';
import CommentCount from '../../components/comment-count';
import CommentItem from '../../components/comment-item';
import CommentTextarea from "../../components/comment-textarea"
import modalsActions from '../../store-redux/modals/actions';
import WelcomeText from '../../components/welcome-text';
import useServices from '../../hooks/use-services';

function Article() {
  const store = useStore();
  const services = useServices();
  const dispatch = useDispatch();
  const params = useParams();
  const initData = {

    text: '',
    parent: {
      _id: params.id,
      _type: '',
    }
  };
  const [data, setData] = useState(initData);
  useInit(async () => {
    await Promise.all([
      dispatch(articleActions.load(params.id)),
      dispatch(articleActions.loadComments(params.id))])
    dispatch(modalsActions.open(params.id))
  }, [params.id, lang, services.i18n.lang], true);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.article.comments.items,
    count: state.article.comments.count,
    modal: state.modals.name
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const exists = useSelector(state => state.session.exists);


  const { t, lang } = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    setIsOpenTextarea: useCallback(_id => { setData((prevData) => ({ ...prevData, text: '' })); dispatch(modalsActions.open(_id)) }, [store]),
    onChange: useCallback(value => setData((prevData) => ({ ...prevData, text: value.text, parent: { _id: value.parent._id, _type: value.parent._type } })
    ), [data, store]),
    onSubmit: useCallback(() => {
      if (!data.text) return alert("Please write comment")
      dispatch(articleActions.sendComment(data));
      setData(initData);
      dispatch(modalsActions.close())
    }, [data, store]),
    onCancel: useCallback((id) => {
      dispatch(modalsActions.open(id))
      setData(prevData => ({ ...prevData, text: '' }))
    }, [store, params.id])
  }

  const renders = {
    commentItem: useCallback((comment) => (
      <CommentItem
        comment={comment} setIsOpenTextarea={callbacks.setIsOpenTextarea} isOpenTextarea={select.modal} data={data} onChange={callbacks.onChange} paramsId={params.id} onSubmit={callbacks.onSubmit} onCancel={callbacks.onCancel}
        exists={exists} t={t} />
    ), [lang, select.comments, select.modal, callbacks.onSubmit]),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        <CommentCount count={select.count} t={t} />
        <CommentList comments={select.comments} renderItem={renders.commentItem} />
        {!exists ? <WelcomeText /> : select.modal === params.id &&
          <CommentTextarea data={data} onChange={callbacks.onChange} paramsId={params.id}
            id={params.id} onSubmit={callbacks.onSubmit} onCancel={callbacks.onCancel} t={t} />}
      </Spinner>
    </PageLayout >
  );
}

export default memo(Article);
