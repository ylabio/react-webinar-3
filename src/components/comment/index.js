import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { memo } from 'react';
import { oneOfType } from 'prop-types';

function Comment({ item, level, currentUser, onAnswer, children, t }) {
  const cn = bem('Comment');

  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' }

  const curUser = currentUser._id == item.author._id ? 'current-user' : '';

  return (
    <div className={cn()} style={{ paddingLeft: (level ? level * 30 : 0) + 'px' }}>
      <div className={cn('head')}>
        <div className={cn('author', curUser)}>{item?.author?.profile?.name}</div>
        <div className={cn('dateTime')}>{new Date(item?.dateCreate).toLocaleDateString('ru-RU', dateOptions).replace(' г.', '')}</div>
      </div>
      <div className={cn('body')}>
        {item?.text}
      </div>
      <div className={cn('footer')} onClick={() => onAnswer(item._id)}>
        {t('comments.toAnswer')}
      </div>
      {children}
    </div>
  )
}

Comment.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.object,
    text: PropTypes.string,
  }),
  level: oneOfType([PropTypes.string, PropTypes.number]),
  currentUser: PropTypes.object,
  onAnswer: PropTypes.func,
  t: PropTypes.func,
  children: PropTypes.node
}

export default memo(Comment);