import React from 'react';
import './style.css';

function CommentLayout({ children, count, title }) {
  return (
    <div className={'CommentLayout'}>
      <h2 className={'CommentLayout-header'}>
        {title} ({count}){' '}
      </h2>
      {children}
    </div>
  );
}

export default CommentLayout;
