import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { memo } from 'react';
import dateTimeFormat from '../../utils/datetime-format';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Comment({ item, currentUser, onAnswer, t, answerTo, input, level = 0 }) {
  const cn = bem('Comment');
  const curUser = currentUser._id == item.author._id ? 'current-user' : '';
  const padding = level > 14 ? '0px' : '30px';

  return (
    <div className={cn()} style={{ paddingLeft: padding }}>
      <div className={cn('head')}>
        <div className={cn('author', curUser)}>{item?.author?.profile?.name}</div>
        <div className={cn('dateTime')}>{dateTimeFormat(item?.dateCreate).replace(' г.', '')}</div>
      </div>
      <div className={cn('body')}>
        {item?.text}
      </div>
      <div className={cn('footer')} onClick={() => onAnswer(item._id)}>
        {t('comments.toAnswer')}
      </div>
      <div className={cn('children')}>
        {item.children && item.children.map(comment => (
          <Comment key={comment._id} t={t} item={comment} answerTo={answerTo}
            currentUser={currentUser} onAnswer={onAnswer} input={input} level={level+1}/>
        ))}
        {answerTo._id == item._id && (<div className={cn('input')}>{input}</div>)}

      </div>
    </div>
  )
}

Comment.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.object,
    text: PropTypes.string,
  }),
  currentUser: PropTypes.object,
  onAnswer: PropTypes.func,
  t: PropTypes.func,
  children: PropTypes.node
}

export default memo(Comment);