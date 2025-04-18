import { memo, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';

import shallowequal from 'shallowequal';

import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';

import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ArticleCard from '../../components/article-card';
import Spinner from '../../components/spinner';
import HeadLayout from '../../components/head-layout';
import ArticleComments from '../../components/article-comments';
import ArticleForm from '../../components/article-form';
import ArticleAuthMessage from '../../components/article-auth-message';
import Textarea from '../../components/textarea';

import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';

import { textsTreeToList } from '../../utils/texts-tree-to-list';
import listToTree from '../../utils/list-to-tree';
import { getLastCommentChildrenId } from '../../utils/get-last-comment-children-id';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  const selectArticle = useSelectorRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal,
  );

  const selectComments = useSelectorRedux(
    state => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
    }),
    shallowequal,
  );

  const selectUser = useSelector(state => ({
    isUserAuth: state.session.exists,
    userId: state.session.user._id,
    token: state.session.token
  }));

  const { t } = useTranslate();

  const [userFormData, setUserFormData] = useState({
    parentId: '',
    isOpenInComments: false,
    parentAuthor: '',
    lastId: '',
  });

  const [comment, setComment] = useState('');

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onOpenCommentForm: useCallback(
      (author, id, listItems) => {
        const { lastItemId, lastChild } = getLastCommentChildrenId(id, listItems);
        return setUserFormData(prevData => ({
          parentId: lastItemId,
          lastId: lastChild,
          isOpenInComments: true,
          parentAuthor: author,
        }));
      },
      [userFormData],
    ),
    onCloseCommentForm: useCallback(() => {
      setUserFormData(prevData => ({
        parentAuthor: '',
        parentId: '',
        lastId: '',
        isOpenInComments: false,
      }));
      setComment('');
    }, [userFormData]),
    onChangeMessage: useCallback(
      value => {
        setComment(prevtext => value.trim());
      },
      [comment],
    ),
    onSubmit: useCallback( async (e) => {
        e.preventDefault();
        const data = {
          _id: selectUser.userId,
          text: comment,
          parent: {
            _id: userFormData.parentId || selectArticle.article._id,
            _type: userFormData.isOpenInComments ? 'comment' : 'article',
          },
          token: selectUser.token,
          articleId: selectArticle.article._id,
        };
        dispatch(commentsActions.addComment(data))
        callbacks.onCloseCommentForm();
      },
      [comment],
    ),
  };

  const options = {
    comments: useMemo(
      () => [
        ...textsTreeToList(listToTree(selectComments.comments.items || []), (item, count) => ({
          ...item,
          paddingL: `${Math.floor(40 * count)}px`,
        })),
      ],
      [selectComments.comments],
    ),
  };

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={selectArticle.article.title}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={selectArticle.waiting}>
          <ArticleCard article={selectArticle.article} onAdd={callbacks.addToBasket} t={t} />
          <Spinner active={selectComments.waiting}>
            <ArticleComments
              items={options.comments}
              commentsCount={selectComments.comments.count}
              lastCommentId={userFormData.lastId}
              onOpenForm={callbacks.onOpenCommentForm}
            >
              {selectUser.isUserAuth ? (
                <ArticleForm
                  title={'Новый ответ'}
                  placeholderText={userFormData.parentAuthor}
                  onCloseForm={callbacks.onCloseCommentForm}
                  isOpenInComments={userFormData.isOpenInComments}
                  onSubmit={callbacks.onSubmit}
                  commentLen={comment.length}
                >
                  <Textarea
                    value={userFormData.text}
                    onChange={callbacks.onChangeMessage}
                    placeholderText={userFormData.parentAuthor}
                  />
                </ArticleForm>
              ) : (
                <ArticleAuthMessage />
              )}
            </ArticleComments>
            {!userFormData.isOpenInComments &&
              (selectUser.isUserAuth ? (
                <ArticleForm
                  title={'Новый комментарий'}
                  onSubmit={callbacks.onSubmit}
                  onChange={callbacks.onChangeMessage}
                  commentLen={comment.length}
                >
                  <Textarea value={userFormData.text} onChange={callbacks.onChangeMessage} />
                </ArticleForm>
              ) : (
                <ArticleAuthMessage />
              ))}
          </Spinner>
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
