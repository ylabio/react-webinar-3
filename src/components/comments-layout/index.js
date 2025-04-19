import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';


function CommentsLayout(props) {
  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.title}</h2>
      {props.children}
    </div>
  );
}

export default memo(CommentsLayout);
