import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const SkeletonItem = React.memo(({ num }) => {
  const cn = bem('Skeleton');
  return <div className={cn('item', { num })}></div>;
});

const Skeleton = React.memo(() => {
  const cn = bem('Skeleton');  
  
  return (
    <div className={cn()}>     
      <div className={cn('content')}>
        Загрузка...
      </div>
    </div>
  );
});

export default Skeleton;
