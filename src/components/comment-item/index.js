import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import dateFormat from '../../utils/date-format';
import Button from '../button';
import './style.css';

function CommentItem({ comment, onReply, depth = 0, locale, authedUser }) {
  const cn = bem('CommentItem');
  const { author, text, dateCreate, _id } = comment;
  const { t, lang } = locale;

  const isAuthor = author?.profile?.name === authedUser?.profile?.name;

  return (
    <div className={cn()} style={{ paddingLeft: 40 * depth }}>
      <div className={cn('wrapper')}>
        <div className={cn('header')}>
          <div className={cn('author', { authedUser: isAuthor })}>{author?.profile?.name}</div>
          <div className={cn('date')}>{dateFormat(dateCreate, lang)}</div>
        </div>
        <div className={cn('text')}>{text}</div>
        <Button
          style="text-primary"
          title={t('comments.reply')}
          fontSize="small"
          onClick={() => onReply(_id)}
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.object,
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    _id: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  }).isRequired,
  authedUser: PropTypes.object,
  onReply: PropTypes.func,
  depth: PropTypes.number,
};

export default memo(CommentItem);
