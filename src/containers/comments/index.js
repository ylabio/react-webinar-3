import { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';

import AuthMessage from '../../components/auth-message';
import CommentForm from '../../components/comment-form';
import CommentItem from '../../components/comment-item';
import CommentList from '../../components/comment-list';

import shallowequal from 'shallowequal';

import commentActions from '../../store-redux/comment/actions';

import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import { formatDate } from '../../utils/formatDate';

function Comments({ id }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const dispatch = useDispatch();
  const { t } = useTranslate();

  const select = useSelectorRedux(
    state => ({
      comment: state.comment.data,
      loading: state.comment.waiting,
    }),
    shallowequal,
  );

  const selectSession = useSelector(state => ({
    exists: state.session.exists,
  }));

  useInit(() => {
    dispatch(commentActions.load(id));
  }, [id, dispatch]);

  const comments = useMemo(() => {
    if (!select.comment.items) return [];

    return [
      ...treeToList(listToTree(select.comment.items), (item, level) => ({
        _id: item._id,
        authorName: item.author.profile.name,
        dateCreate: formatDate(item.dateCreate),
        text: item.text,
        level: level,
      })),
    ];
  }, [select.comment.items]);

  const callbacks = {
    onReply: useCallback(id => {
      setReplyingTo(prevId => (prevId === id ? null : id));
      setReplyText('');
    }, []),

    handleSubmitReply: useCallback(async () => {
      if (!replyText.trim() || !replyingTo) return;

      await dispatch(commentActions.create(replyText, replyingTo, 'comment'))
        .then(() => {
          dispatch(commentActions.load(id));
          setReplyingTo(null);
          setReplyText('');
        })
        .catch(error => console.log(`Ошибка отправки комментария: ${error}`));
    }, [dispatch, replyText, replyingTo, id]),

    handleSubmitNewComment: useCallback(async () => {
      if (!newCommentText.trim()) return;

      await dispatch(commentActions.create(newCommentText, id, 'article'))
        .then(() => {
          dispatch(commentActions.load(id));
          setNewCommentText('');
          setReplyingTo(null);
        })
        .catch(error => console.log(`Ошибка отправки комментария: ${error}`));
    }, [dispatch, newCommentText, id]),
  };

  return (
    <>
      <CommentList title={`${t('comment.title')}(${select.comment.count || 0})`}>
        {select.loading ? (
          <div>Загрузка ...</div>
        ) : (
          comments.map(item => (
            <CommentItem
              key={item._id}
              comment={item}
              onReply={callbacks.onReply}
              buttonText={t('comment.reply')}
            >
              {replyingTo === item._id &&
                (selectSession.exists ? (
                  <CommentForm
                    title={t('comment.new-reply')}
                    submitTitle={t('comment.submit')}
                    cancelTitle={t('comment.cancel')}
                    value={replyText}
                    onChange={setReplyText}
                    onSubmit={callbacks.handleSubmitReply}
                    onCancel={() => callbacks.onReply(item._id)}
                  />
                ) : (
                  <AuthMessage t={t} />
                ))}
            </CommentItem>
          ))
        )}
      </CommentList>

      {!replyingTo &&
        (selectSession.exists ? (
          <CommentForm
            title={t('comment.new-title')}
            submitTitle={t('comment.submit')}
            value={newCommentText}
            onChange={setNewCommentText}
            onSubmit={callbacks.handleSubmitNewComment}
          />
        ) : (
          <AuthMessage t={t} />
        ))}
    </>
  );
}

Comments.propTypes = {
  id: PropTypes.string.isRequired,
};

export default memo(Comments);
