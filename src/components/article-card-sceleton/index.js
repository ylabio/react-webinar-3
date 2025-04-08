import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Fragment } from 'react'; // будем использовать те же стили

function ArticleCardSkeleton() {

  const cn = bem('ArticleCardSkeleton');

  return (
    <div className={cn()}>

      <div className={cn('box', {type: 'description'})}/>

      <div className={cn('info')}>
        {[1,2,3].map((item) => (
          <Fragment key={item}>
            <div className={cn('box', {type: 'label'})}/>
            <div className={cn('box', {type: 'value'})}/>
          </Fragment>
        ))}

      </div>

      <div className={cn('box', {type: 'price'})}/>

      <div className={cn('box', {type: 'button'})}/>
    </div>
  );
}

export default ArticleCardSkeleton;
