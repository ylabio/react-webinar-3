import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import CommentItem from '../comment-item';

import './style.css';

function CommentList({ comments, curLevel = 0 }) {
  const cn = bem('CommentList');

  return (
    <div style={{ marginLeft: `${curLevel * 40}px` }} className={cn()}>
      {comments
        .filter(item => item.level === curLevel)
        .map(item => (
          <CommentItem key={item._id} item={item} ></CommentItem>
        ))}
    </div>
  );
}

CommentList.propTypes = {};

export default memo(CommentList);
