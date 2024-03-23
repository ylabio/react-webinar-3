import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import './style.css';

const MAX_NESTING_LEVEL_FOR_PADDING_LEFT = 3;

function CommentItem({commentData, onReply, t, nestingLevel = 1}) {
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
          }`,
          // `${
          //   nestingLevel === 1 ?
          //   cn('padding-left_big') :
          //     nestingLevel <= MAX_NESTING_LEVEL_FOR_PADDING_LEFT && nestingLevel !== 1 ?
          //     cn('padding-left_medium') : ''
          // }`,
          // `${
          //   nestingLevel === 1 ?
          //   cn('padding-right') :
          //   ''
          // }`
        ].join(' ')
      }
    >
      <div className={cn('lineBox')}>
        <div className={cn('author')}>{commentData.author.profile.name}</div>
        <div className={cn('dateCreate')}>{dateFormat(commentData.dateCreate, t('locale'))}</div>
      </div>
      <p className={cn('text')}>{commentData.text}</p>
      <button onClick={() => onReply(commentData._id)} className={cn('replyButton')}>{t('comment.reply')}</button>
      {
        commentData.children && commentData.children.map(item => {
          return (
            <div key={item._id} className={cn('childBox')}>
              <CommentItem commentData={item} t={t} nestingLevel={nestingLevel + 1} />
            </div>
          )
        })
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