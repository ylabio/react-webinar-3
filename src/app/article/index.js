import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';

import shallowequal from 'shallowequal';

import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';

import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import userCommentsAction from '../../store-redux/user-comment/actions';

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
  const { t, lang } = useTranslate();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(articleActions.load(params.id));
  }, [params.id, lang]);

  const selectUser = useSelector(state => ({
    isUserAuth: state.session.exists,
    userId: state.session.user._id,
    token: state.session.token,
  }));

  const { article, comments, userComment, ...state } = useSelectorRedux(
    state => ({ ...state }),
    shallowequal,
  );

  useInit(() => {
    dispatch(userCommentsAction.init(selectUser.userId, selectUser.token, params.id));
  }, [selectUser.token]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onCloseFormInComments: useCallback(() => {
      dispatch(userCommentsAction.setCommentsData(params.id, '', 'article', '', false));
      callbacks.onChangeCommentMessage('');
    }, []),
    onChangeCommentData: useCallback(
      (parentId, typeComment, authorNick = '') => {
        const { lastItemId, lastChildFromTree } = getLastCommentChildrenId(
          parentId,
          comments.data.items,
        );

        dispatch(
          userCommentsAction.setCommentsData(
            lastItemId,
            lastChildFromTree,
            typeComment,
            authorNick,
            true,
          ),
        );

        callbacks.onChangeCommentMessage('');
      },
      [comments.data.items],
    ),
    onChangeCommentMessage: useCallback(value => {
      dispatch(userCommentsAction.setUserMessage(value));
    }, []),
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        const data = {
          _id: userComment.userId,
          text: userComment.userComment.trim(),
          parent: {
            ...userComment.parent,
          },
          token: userComment.userToken,
        };

        dispatch(commentsActions.addComment(data));

        if (!article.waiting) {
          callbacks.onCloseFormInComments();
        }
      },
      [userComment],
    ),
  };

  const options = {
    comments: useMemo(
      () => [
        ...textsTreeToList(listToTree(comments.data.items || []), (item, count) => ({
          ...item,
          paddingL: `${Math.floor(40 * count)}px`,
        })),
      ],
      [comments.data.items],
    ),
  };

  const disabledBtn = article.waiting || !userComment.userComment.trim();

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={article.data.title}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={article.waiting}>
          <ArticleCard article={article.data} onAdd={callbacks.addToBasket} t={t} />
          <Spinner active={comments.waiting}>
            <ArticleComments
              t={t}
              lang={lang}
              items={options.comments}
              commentsCount={comments.data.count}
              lastCommentId={userComment.lastIdFromCommentTree}
              onChangeCommentData={callbacks.onChangeCommentData}
            >
              {selectUser.isUserAuth ? (
                <ArticleForm
                  t={t}
                  title={t('comments.new-answer')}
                  onCloseForm={callbacks.onCloseFormInComments}
                  isOpenInComments={userComment.isOpenFormInComments}
                  onSubmit={callbacks.onSubmit}
                  isDisabledBtn={disabledBtn}
                >
                  <Textarea
                    value={userComment.userComment}
                    onChange={callbacks.onChangeCommentMessage}
                    placeholderText={`${t('answer.for')} ${userComment.commentAuthorNick}`}
                  />
                </ArticleForm>
              ) : (
                <ArticleAuthMessage />
              )}
            </ArticleComments>
            {!userComment.isOpenFormInComments &&
              (selectUser.isUserAuth ? (
                <ArticleForm
                  t={t}
                  title={t('comments.new')}
                  onSubmit={callbacks.onSubmit}
                  isDisabledBtn={disabledBtn}
                >
                  <Textarea
                    value={userComment.userComment}
                    onChange={callbacks.onChangeCommentMessage}
                  />
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
