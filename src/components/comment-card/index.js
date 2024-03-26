import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentList from '../comment-list';
import formatDate from '../../utils/formatDate';
import CommentForm from '../comment-form';
import formatTextWithLineBreaks from '../../utils/formattedText';
import { NavLink } from 'react-router-dom';
import './style.css';

function CommentCard({ comment, depth, replyingTo, onReply, handleCommentSubmit, session, t }) {
  const cn = bem('CommentCard');

  const handleReply = (e, commentId) => {
    e.preventDefault();
    onReply(commentId);
  }

  useEffect(() => {
    const new_comment = document.getElementById('new_comment');
    if (new_comment && replyingTo) {
      const windowHeight = window.innerHeight;
      const { top, bottom } = new_comment.getBoundingClientRect();
      const sectionHeight = bottom - top;
      const scrollPosition = top - (windowHeight - sectionHeight) / 2;

      window.scrollTo({
        top: window.scrollY + scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [replyingTo]);

  const renders = {
    item: useCallback(item => (
      <CommentCard
        comment={item}
        depth={depth + 1}
        replyingTo={replyingTo}
        onReply={onReply}
        handleCommentSubmit={handleCommentSubmit}
        session={session}
        t={t} />
    ), [replyingTo]),
  };

  const author = comment.author._id === session.user._id ?
    <div className={cn('current-user')}>{session.user.profile.name}</div> :
    <div className={cn('user')}>{comment.author?.profile.name}</div>

  return (
    <div className={cn()} >
      <div className={cn('head')}>
          {author}
        <div className={cn('date')}>{formatDate(comment.dateCreate)}</div>
      </div>
      <div className={cn('body')}>
        <div className={cn('text')}>{formatTextWithLineBreaks(comment.text)}</div>
      </div>
      <a href='/' className={cn('answer-btn')} onClick={(e) => handleReply(e, comment._id)}>{t('comment.answer')}</a>
      <CommentList list={comment.children} renderItem={renders.item} />
      {replyingTo === comment._id &&
        <>
          {session.exists ?
            <CommentForm
              parentId={comment._id}
              type='comment'
              onReply={onReply}
              onSubmit={handleCommentSubmit}
              t={t} />
            :
            <div className={cn('footer')} id='new_comment'>
              <NavLink to='/login'>Войдите</NavLink>, чтобы иметь возможность комментировать.
              <a href='#' className={cn('cancel')} onClick={(e) => handleReply(e, null)}>{t('comment.cancel')}</a>
            </div>
          }
        </>
      }
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      })
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  onReply: PropTypes.func,
  t: PropTypes.func,
  depth: PropTypes.number
};

CommentCard.defaultProps = {
  onReply: (comment_id) => {
  },
  t: (text) => text
}

export default memo(CommentCard);
