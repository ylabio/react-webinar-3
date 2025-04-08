import { cn as bem } from '@bem-react/classname';
import './style.css'; // будем использовать те же стили

function ArticleCardSkeleton() {

  const cn = bem('ArticleCardSkeleton');

  return (
    <div className={cn()}>
      {/* Описание */}
      <div className={cn('box', {type: 'description'})}/>

      {/* Информация (3 строки по 2 столбца) */}
      <div className={cn('info')}>
        {Array.from({ length: 3 }).map((_, i) => (
          <>
            <div className={cn('box', {type: 'label'})} key={`label-${i}`}/>
            <div className={cn('box', {type: 'value'})} key={`value-${i}`}/>
          </>
        ))}
      </div>

      {/* Цена */}
      <div className={cn('box', {type: 'price'})}/>

      {/* Кнопка */}
      <div className={cn('box', {type: 'button'})}/>
    </div>
  );
}

export default ArticleCardSkeleton;
