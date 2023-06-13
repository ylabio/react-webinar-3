import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import { useSelector as useReduxSelector } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import CommentsList from '../../components/comments-list';
import ReplyForm from '../../components/reply-form';
import CommentsRedirect from '../../components/comments-redirect';
import CommentsTitle from '../../components/comments-title';

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();

  const reduxSelect = useReduxSelector(
    (state) => ({
      commentsTree: state.comments.commentsTree,
      count: state.comments.count,
      waiting: state.comments.waiting,
      send: state.comments.send,
      commentReplyId: state.comments.commentReplyId,
    }),
    shallowequal
  );

  const select = useSelector((state) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  useEffect(() => {
    dispatch(commentsActions.load(params.id));
    return () => {
      dispatch(commentsActions.cancel());
    };
  }, []);

  const callbacks = {
    // Колбэк на установку id комментария для ответа
    onReply: useCallback((id) => {
      dispatch(commentsActions.reply(id));
    }, []),

    // Отправка комментария
    onSubmit: useCallback((text) => {
      const _type = reduxSelect.commentReplyId ? 'comment' : 'article';
      const _id = reduxSelect.commentReplyId || params.id;
      dispatch(
        commentsActions.add({
          text,
          parent: { _id, _type },
        })
      );
    }),

    // Колбэк на сброс id комментария для ответа
    onCancel: useCallback((e) => {
      if (e) e.preventDefault();
      dispatch(commentsActions.cancel());
    }),
  };

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <CommentsTitle title={t('comments')} count={reduxSelect.count} />
      <CommentsList
        list={reduxSelect.commentsTree}
        onReply={callbacks.onReply}
        commentReplyId={reduxSelect.commentReplyId}
        t={t}
        replyForm={
          select.exists ? (
            <ReplyForm
              title={t('reply.titleNewReply')}
              labelSend={t('reply.labelSend')}
              labelCancel={t('reply.labelCancel')}
              onSubmit={callbacks.onSubmit}
              onCancel={callbacks.onCancel}
              type={'comment'}
            />
          ) : (
            <CommentsRedirect
              linkText={t('comments.linkText')}
              text={t('reply.text')}
              type={'reply'}
              onCancel={callbacks.onCancel}
              labelCancel={t('reply.labelCancel')}
              redirect='/login'
            />
          )
        }
      />
      {select.exists && !reduxSelect.commentReplyId && (
        <ReplyForm
          title={t('reply.titleNewComment')}
          labelSend={t('reply.labelSend')}
          onSubmit={callbacks.onSubmit}
          type={'article'}
        />
      )}
      {!select.exists && !reduxSelect.commentReplyId && (
        <CommentsRedirect
          linkText={t('comments.linkText')}
          text={t('comments.text')}
          redirect='/login'
        />
      )}
    </Spinner>
  );
}

export default memo(Comments);
