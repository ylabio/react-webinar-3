import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import shallowEqual from 'shallowequal';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import ItemComment from '../../components/item-comment';
import CommentsContainer from '../../components/comments-container';
import commentsActions from '../../store-redux/comments/action';
import Spinner from '../../components/spinner';
import CommentsForm from '../../components/comments-form';
import CommentsPrompt from '../../components/prompt-for-comments';
import formatDate from '../../utils/format-date';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import findLastChild from '../../utils/find-last-child';
import findInsertPosition from '../../utils/find-insert-position';

const Comments = () => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const back = location?.pathname || '/';
  const formRef = useRef(null);

  const [newComment, setNewComment] = useState({
    parent: { _id: '', _type: '' },
    text: '',
  });
  const [activeReplyId, setActiveReplyId] = useState(null);

  const selectRedux = useReduxSelector(
    state => ({
      commentsList: state.comments.data,
      waiting: state.comments.waiting,
      success: state.comments.success,
      article: state.article.data,
    }),
    shallowEqual,
  );

  const select = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user,
  }));

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  useEffect(() => {
    if (activeReplyId && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeReplyId]);

  const parent = useMemo(
    () => ({
      _id: activeReplyId || params.id,
      _type: activeReplyId ? 'comment' : selectRedux.article._type,
    }),
    [activeReplyId, params.id, selectRedux.article._type],
  );

  const commentListTree = useMemo(
    () => listToTree(selectRedux.commentsList),
    [selectRedux.commentsList],
  );

  const comments = useMemo(
    () =>
      treeToList(commentListTree, (item, level) => ({
        id: item._id,
        level,
        padding: Math.min(level, 8) * 40,
        author: item.author?.profile?.name,
        date: item.dateCreate,
        text: item.text,
      })),
    [commentListTree],
  );

  const lastChild = useMemo(
    () => findLastChild(commentListTree, activeReplyId),
    [commentListTree, activeReplyId],
  );

  const insertPost = useMemo(
    () => findInsertPosition(activeReplyId, lastChild, comments),
    [activeReplyId, lastChild, comments],
  );

  const callbacks = {
    onChange: useCallback(
      e => {
        setNewComment(prev => ({
          ...prev,
          parent,
          text: e.target.value,
        }));
      },
      [parent],
    ),

    onSubmit: useCallback(
      e => {
        e.preventDefault();
        const isEmpty = newComment.text.trim().length > 0;

        if (isEmpty) {
          dispatch(commentsActions.create(newComment, select.user.profile.name));
          setNewComment({ parent, text: '' });
          setActiveReplyId(null);
        }
      },
      [newComment, select.user?.profile?.name, dispatch, parent],
    ),

    onCancel: useCallback(() => {
      setNewComment(prev => ({ ...prev, text: '' }));
      setActiveReplyId(null);
    }, []),

    onAnswer: useCallback(
      comment => {
        setNewComment(prev => ({
          ...prev,
          text: `${t('comments.answer-text')}${comment.author}`,
        }));
        setActiveReplyId(comment.id);
      },
      [t],
    ),
  };

  const renderComment = (comment, index) => {
    const isCurrentUserComment = select.user.profile?.name === comment.author;
    const commentStyle = {
      color: isCurrentUserComment ? '#4B5563' : '',
      paddingLeft: comment.padding,
      marginTop: index === 0 ? '24px' : 0,
    };

    return (
      <div key={comment.id}>
        <div style={commentStyle}>
          <ItemComment
            padding={comment.padding}
            author={comment.author}
            date={formatDate(comment.date)}
            text={comment.text}
            titleBtn={t('comments.answer')}
            onClick={() => callbacks.onAnswer(comment)}
          />
        </div>

        {select.exists && lastChild?._id === comment.id && (
          <div ref={formRef} style={{ marginLeft: `${insertPost.level * 40}px` }}>
            <CommentsForm
              onSubmit={callbacks.onSubmit}
              style="small"
              option="cancel"
              onClick={callbacks.onCancel}
              value={newComment.text}
              onChange={callbacks.onChange}
              success={selectRedux.success}
              t={t}
            />
          </div>
        )}

        {!select.exists && activeReplyId === comment.id && (
          <div style={{ marginLeft: `${insertPost.level * 40}px` }}>
            <CommentsPrompt
              back={back}
              subLink={t('comments.singIn')}
              subDesc={t('comments.singIn-desc')}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <CommentsContainer t={t} count={comments.length}>
      <Spinner active={selectRedux.waiting}>{comments.map(renderComment)}</Spinner>

      {!select.exists && !activeReplyId && (
        <CommentsPrompt
          back={back}
          subLink={t('comments.singIn')}
          subDesc={t('comments.singIn-desc')}
        />
      )}

      {select.exists && !activeReplyId && (
        <CommentsForm
          onSubmit={callbacks.onSubmit}
          style="small"
          value={newComment.text}
          onChange={callbacks.onChange}
          success={selectRedux.success}
          t={t}
        />
      )}
    </CommentsContainer>
  );
};

export default memo(Comments);
