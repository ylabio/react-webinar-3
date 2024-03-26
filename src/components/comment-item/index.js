import {memo, useRef} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import './style.css';
import CommentTool from '../comment-tool';

const MAX_NESTING_LEVEL_FOR_PADDING_LEFT = 5;

function CommentItem({
  commentData,
  session,
  onReply,
  onClose,
  onLogin,
  onSend,
  currentId,
  setActiveId,
  t,
  nestingLevel = 1
}) {
  const cn = bem('CommentItem');
  const commentRef = useRef(null);

  let isUserAuthor = false;

  if (session.exist) {
    if (session.user._id === commentData.author._id) {
      isUserAuthor = true;
    }
  }

  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  };

  const handleSubmit = (id) => {
    onReply(id);
    setActiveId(id);
    scrollToComment();
  }

  return (
    <div
      ref={commentRef}
      className={
        [
          cn(),
          `${
            nestingLevel <= MAX_NESTING_LEVEL_FOR_PADDING_LEFT && nestingLevel !== 1 ?
            cn('padding-left_medium') :
            ''
          }`
        ].join(' ')
      }
    >
      <div className={cn('lineBox')}>
        <div className={isUserAuthor ? cn('author_active') : cn('author')}>{commentData.author?.profile.name}</div>
        <div className={cn('dateCreate')}>{commentData.dateCreate && dateFormat(commentData.dateCreate, t('locale'))}</div>
      </div>
      <p className={cn('text')}>{commentData.text}</p>
      <button onClick={() => handleSubmit(commentData._id)} className={cn('replyButton')}>{t('comment.reply')}</button>
      {
        commentData.children && commentData.children.map(item => {
          return (
            <div key={item._id} className={cn('childBox')}>
              <CommentItem
                commentData={item}
                session={session}
                onReply={onReply}
                onClose={onClose}
                onLogin={onLogin}
                onSend={onSend}
                currentId={currentId}
                setActiveId={setActiveId}
                t={t}
                nestingLevel={nestingLevel + 1}
              />
            </div>
          )
        })
      }
      {
        commentData._id === currentId &&
        <CommentTool
          session={session.exist}
          currentId={currentId}
          onLogin={onLogin}
          onSend={onSend}
          type='comment'
          title={t('coment.toolReply')}
          placeholder={`${t('comment.toolReplyPlaceholder')} ${commentData.author.profile.name}`}
          onClose={onClose}
          t={t}
        />
      }
    </div>

  );
}

CommentItem.propTypes = {
  commentData: PropTypes.object,
  onReply: PropTypes.func,
  t: PropTypes.func
};

CommentItem.defaultProps = {
  onReply: () => {
  },
  t: (text) => text
};

export default memo(CommentItem);