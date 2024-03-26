import {memo, useCallback, useState, useMemo, useEffect} from 'react';
import useSelector from '../../hooks/use-selector';
import {useDispatch, useSelector as useSelectorRedux, shallowEqual} from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import List from '../../components/list';
import Spinner from '../../components/spinner';
import CommentsTitle from '../../components/comments-title';
import Comment from '../../components/comment';
import CommentsForm from '../../components/comments-form';
import LoginInvite from '../../components/login-invite';
import formatCommentDate from '../../utils/format-comment-date';
import listToTree from '../../utils/list-to-tree';
import {useLocation} from 'react-router-dom';

function Comments({articleId}) {
  const [activeFormId, setActiveFormId] = useState(articleId);

  const {hash, pathname} = useLocation();
  const hashId = hash.slice(1);
  const select = useSelector((state) => ({
    isSession: state.session.exists,
    ownId: state.session.user?._id,
  }));

  const redux = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items || [],
      count: state.comments.data.count,
      addingErrors: state.comments.addingErrors,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);
  // console.log(window.history);
  useEffect(() => {
    hashId && setActiveFormId(hashId);
    window.history.replaceState({}, '', pathname);
    return () => dispatch(commentsActions.resetErrors());
  }, []);

  const callbacks = {
    addComment: useCallback(
      (data) => {
        dispatch(commentsActions.add(data));
        if (!redux.addingErrors) setActiveFormId(articleId);
      },
      [redux.addingErrors, articleId]
    ),
    cancelComment: useCallback(() => setActiveFormId(articleId), [articleId]),
    activateForm: useCallback((id) => setActiveFormId(id), []),
    commentsMapper: useCallback(
      (item) => ({
        _id: item._id,
        text: item.text,
        authorName: item.author.profile.name,
        authorId: item.author._id,
        date: formatCommentDate(item.dateCreate),
        children: item.children,
      }),
      []
    ),
    makeRender: useCallback(
      (level) => (comment) =>
        (
          <Comment
            comment={comment}
            activeId={activeFormId}
            isSession={select.isSession}
            loginLink={'/login'}
            onSubmit={callbacks.addComment}
            onCancel={callbacks.cancelComment}
            onActivate={callbacks.activateForm}
            self={select.ownId === comment.authorId}
            error={redux.addingErrors?.id === comment._id ? redux.addingErrors.other : null}
            makeRender={callbacks.makeRender}
            mapper={callbacks.commentsMapper}
            level={level}
          />
        ),
      [activeFormId, redux.addingErrors, select.isSession]
    ),
  };

  const commentsTree = listToTree(redux.comments);
  const rootRaw = commentsTree.length ? commentsTree[0].children : [];
  const rootComments = useMemo(() => rootRaw.map(callbacks.commentsMapper), [redux.comments]);

  const renders = {
    comment: useCallback(callbacks.makeRender(0), [callbacks.makeRender]),
  };

  const {t} = useTranslate();

  const footer = select.isSession ? (
    <CommentsForm
      autoFocus={hashId === articleId}
      id={articleId}
      isRoot={true}
      onSubmit={callbacks.addComment}
      error={redux.addingErrors?.id === articleId ? redux.addingErrors.other : null}
    />
  ) : (
    <LoginInvite
      link={'/login'}
      isRoot={true}
      anchor={articleId}
    />
  );
  return (
    <Spinner active={redux.waiting}>
      <CommentsTitle count={redux.count} />
      <List
        list={rootComments}
        renderItem={renders.comment}
        noBorder={true}
      />
      {activeFormId === articleId && footer}
    </Spinner>
  );
}

export default memo(Comments);
