import { cn as bem } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';

function Comment({item, level}) {
  const cn = bem('Comment');

  return(
    <div className={cn()}>

    </div>
  )
}

export default memo(Comment);