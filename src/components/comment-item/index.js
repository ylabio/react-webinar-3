import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import './style.css';
import CommentTool from '../comment-tool';

const MAX_NESTING_LEVEL_FOR_PADDING_LEFT = 3;

function CommentItem({commentData, session, onReply, onClose, currentId, t, nestingLevel = 1}) {
  const cn = bem('CommentItem');

  return (
    <div
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
        <div className={cn('author')}>{commentData.author?.profile.name}</div>
        <div className={cn('dateCreate')}>{commentData.dateCreate && dateFormat(commentData.dateCreate, t('locale'))}</div>
      </div>
      <p className={cn('text')}>{commentData.text}</p>
      <button onClick={() => onReply(commentData._id)} className={cn('replyButton')}>{t('comment.reply')}</button>
      {
        commentData.children && commentData.children.map(item => {
          return (
            <div key={item._id} className={cn('childBox')}>
              <CommentItem commentData={item} session={session} onReply={onReply} currentId={currentId} t={t} nestingLevel={nestingLevel + 1} />
            </div>
          )
        })
      }
      {
        commentData._id === currentId &&
        <CommentTool
          session={session}
          currentId={currentId}
          type='reply'
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