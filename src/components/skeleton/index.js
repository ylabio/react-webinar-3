import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const SkeletonItem = React.memo(({ num }) => {
  const cn = bem('Skeleton');
  return <div className={cn('item', { num })}></div>;
});

const Skeleton = React.memo(() => {
  const cn = bem('Skeleton');
  const items = Array.from({ length: 10 }, (_, index) => <SkeletonItem key={index} num={index + 1} />);
  
  return (
    <div className={cn()}>     
      <div className={cn('content')}>
        {items}
      </div>
    </div>
  );
});

export default Skeleton;
