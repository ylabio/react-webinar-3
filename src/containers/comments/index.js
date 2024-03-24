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
import sortByParent from '../../utils/sort-by-parent';
import LoginInvite from '../../components/login-invite';
import formatCommentDate from '../../utils/format-comment-date';

function Comments({articleId}) {
  const [activeFormId, setActiveFormId] = useState(articleId);

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

  useEffect(() => {
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
  };

  const commentsList = useMemo(
    () =>
      sortByParent(redux.comments, (item, level) => ({
        _id: item._id,
        authorName: item?.author?.profile?.name,
        authorId: item?.author?._id,
        date: formatCommentDate(item.dateCreate),
        text: item.text,
        style: {marginLeft: level > 10 ? '300px' : `${level * 30}px`},
      })),
    [redux.comments]
  );

  const renders = {
    comment: useCallback(
      (comment) => (
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
          style={comment.style}
        />
      ),
      [activeFormId, redux.addingErrors] // t
    ),
  };

  const {t} = useTranslate();

  const footer = select.isSession ? (
    <CommentsForm
      id={articleId}
      isRoot={true}
      onSubmit={callbacks.addComment}
      error={redux.addingErrors?.id === articleId ? redux.addingErrors.other : null}
    />
  ) : (
    <LoginInvite
      link={'/login'}
      isRoot={true}
    />
  );
  return (
    <Spinner active={redux.waiting}>
      <CommentsTitle count={redux.count} />
      <List
        list={commentsList}
        renderItem={renders.comment}
        noBorder={true}
      />
      {activeFormId === articleId && footer}
    </Spinner>
  );
}

export default memo(Comments);
