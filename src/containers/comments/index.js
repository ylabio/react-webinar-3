import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import { useLocation, useParams } from 'react-router-dom';
import ItemComment from '../../components/item-comment';
import CommentsContainer from '../../components/comments-container';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';
import { useDispatch, useSelector as UseSelectRedux } from 'react-redux';
import useInit from '../../hooks/use-init';
import shallowEqual from 'shallowequal';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import Spinner from '../../components/spinner';
import CommentsForm from '../../components/comments-form';
import CommentsPrompt from '../../components/login-prompt';
import formatDate from '../../utils/date-format';
import findLastChild from '../../utils/findLastChild';
import findInsertPosition from '../../utils/findInsertPosition';

function Comments({}) {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const back = location ? location?.pathname : '/';
  const [newComment, setNewComment] = useState({
    parent: {
      _id: '',
      _type: '',
    },
    text: '',
  });
  const [activeReplyId, setActiveReplyId] = useState(null);

  const formRef = useRef(null);

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

  const selectRedux = UseSelectRedux(
    state => ({
      commentsList: state.comments.data,
      waiting: state.comments.waiting,
      success: state.comments.success,
      article: state.article.data,
    }),
    shallowEqual,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const parent = useMemo(
    () => ({
      _id: activeReplyId || params.id,
      _type: activeReplyId ? 'comment' : selectRedux.article._type,
    }),
    [activeReplyId, params.id, selectRedux.article._type],
  );

  const callbacks = {
    onChange: useCallback(
      e => {
        setNewComment({
          parent,
          text: e.target.value,
        });
      },
      [setNewComment, activeReplyId],
    ),

    onSubmit: useCallback(
      e => {
        e.preventDefault();
        const isEmpty = newComment.text.toString().trim().length > 0;
        if (isEmpty) {
          dispatch(commentsActions.create(newComment, select.user.profile.name));
          setNewComment({
            parent,
            text: '',
          });
          setActiveReplyId(null);
        }
      },
      [newComment],
    ),
    onCancel: useCallback(
      e => {
        setNewComment(prev => ({ ...prev, text: '' }));
        setActiveReplyId(null);
      },
      [setActiveReplyId],
    ),
    onAnswer: useCallback(
      c => {
        setNewComment(prev => ({ ...prev, text: `${t('comments.answer-text')}${c.author}` }));
        setActiveReplyId(c.id);
      },
      [setActiveReplyId, setNewComment],
    ),
  };
  const select = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user,
  }));

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(listToTree(selectRedux.commentsList), (item, level) => ({
          id: item._id,
          level: level,
          padding: level >= 8 ? 40 * 8 : 40 * level,
          author: item.author?.profile?.name,
          date: item.dateCreate,
          text: item.text,
        })),
      ],
      [selectRedux.commentsList],
    ),
    commentListTree: useMemo(
      () => listToTree(selectRedux.commentsList),
      [selectRedux.commentsList],
    ),
    lastChild: useMemo(() => {
      const commentListTree = listToTree(selectRedux.commentsList);
      return findLastChild(commentListTree, activeReplyId);
    }, [selectRedux.commentsList, activeReplyId]),
  };

  const insertPost = useMemo(() => {
    return findInsertPosition(activeReplyId, options.lastChild, options.comments);
  }, [options.lastChild, activeReplyId, options.comments]);

  return (
    <CommentsContainer t={t} count={options.comments.length}>
      <Spinner active={selectRedux.waiting}>
        {options.comments.map((comment, indx) => {
          const style = {
            color: select.user.profile?.name === comment.author ? '#4B5563' : '',
            paddingLeft: comment.padding,
            marginTop: indx === 0 ? '24px' : 0,
          };
          return (
            <div key={comment.id}>
              <div style={{ ...style }}>
                <ItemComment
                  padding={comment.padding}
                  author={comment.author}
                  date={formatDate(comment.date)}
                  text={comment.text}
                  titleBtn={t('comments.answer')}
                  onClick={() => callbacks.onAnswer(comment)}
                />
              </div>
              {select.exists && options.lastChild?._id === comment.id && (
                <div ref={formRef} style={{ marginLeft: `${insertPost.level * 40}px` }}>
                  <CommentsForm
                    onSubmit={callbacks.onSubmit}
                    style="small"
                    option="cancel"
                    onClick={callbacks.onCancel}
                    value={newComment ? newComment.text : newComment}
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
        })}
      </Spinner>
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
}

export default memo(Comments);
