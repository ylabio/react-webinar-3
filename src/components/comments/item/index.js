import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import formatDate from '../../../utils/format-date';
import './style.css';

/**
 * Итем комментария. Свой коммент теперь выделяется.
 */

function CommentItem({ id, user, isMine, date, text, onReply, shift, t, onRemove }) {
  const cn = bem('CommentItem');

  return (
    <div className={cn()} style={{ paddingLeft: 30 * shift + 'px' }}>
      <div className={cn('title')}>
        <div className={isMine ? cn('my') : cn('user')}>{user.name}</div>
        <div className={cn('date')}>{formatDate(date, t)}</div>
      </div>
      <div className={cn('text')}>{text}</div>
      <div className={cn('controls')}>
        <div className={cn('reply')} onClick={() => onReply(id, user.name)}>{t('comments.reply')}</div>
        {onRemove != null ? // к задаче никак не относится, ради проверки добавил :)
          <div className={cn('remove')} onClick={() => onRemove(id)}>Remove</div>
          : null
        }
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object,
  isMine: PropTypes.bool,
  date: PropTypes.string,
  text: PropTypes.string,
  onReply: PropTypes.func,
  onRemove: PropTypes.func,
  shift: PropTypes.number,
  t: PropTypes.func
}

CommentItem.defaultProps = {
  user: { name: 'UserName' },
  isMine: false,
  date: '',
  text: '',
  onReply: () => { },
  onRemove: null,
  shift: 0,
  t: () => { }
}

export default React.memo(CommentItem);