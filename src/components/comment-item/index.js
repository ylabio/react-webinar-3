import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

import { formatPrettyDate } from '../../utils/format-pretty-date';

function CommentItem(props) {

  const {
    active = false,
    comment,
    my = false,
    onStartReply = () => {},
    onCancelReply = () => {},
    t = text => text,
    locale = 'ru'
  } = props;

  const cn = bem('CommentItem');

  const formattedDate = formatPrettyDate(comment.dateCreate, locale);

  const handleToggleReply = useCallback(() => {
    if (active) {
      onCancelReply();
    } else {
      onStartReply();
    }
  }, [active, onStartReply, onCancelReply]);

  return (
    <div className={cn()} id={`comment-${comment.parent._id}`}>
      <p className={cn('caption', { my })}>
        <b>{comment.author}</b>{formattedDate}
      </p>
      <p className={cn('text')}>{comment.text}</p>
      <Button
        title={t('comment.reply')}
        style="text"
        onClick={handleToggleReply}
      />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    value: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string,
    dateCreate: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  my: PropTypes.bool,
  onStartReply: PropTypes.func,
  onCancelReply: PropTypes.func,
  t: PropTypes.func,
};

export default memo(CommentItem);
