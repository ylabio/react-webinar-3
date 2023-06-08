import React from 'react'
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentsForm from '../../containers/comments-form';

function CommentsLayout({children, quantity}) {
  const cn = bem('CommentLayout')

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Комментарии ({quantity})</h3>

      <div className={cn('comments')}>
        {children}
      </div>
      
      {/* <CommentsForm /> */}
    </div>
  )
}

export default CommentsLayout