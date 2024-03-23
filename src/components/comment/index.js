import { cn as bem } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';

function Comment({item, level}) {
  const cn = bem('Comment');

  const dateOptions = {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'}

  return(
    <div className={cn()} style={{paddingLeft: (level? level*30 : 0) + 'px' }}>
      <div className={cn('head')}>
        <div className={cn('author')}>{item?.author?.profile?.name}</div>
        <div className={cn('dateTime')}>{new Date(item?.dateCreate).toLocaleDateString('ru-RU', dateOptions).replace(' г.', '')}</div>
      </div>
      <div className={cn('body')}>
        {item?.text}
      </div>
      <div className={cn('footer')} onClick={''}>
        Ответить
      </div>
    </div>
  )
}

export default memo(Comment);