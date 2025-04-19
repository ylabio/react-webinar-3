import { memo } from 'react';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NewComment() {
  const cn = bem('NewComment');

  return (
    <form className={cn()}>
      <h3 className={cn('caption')}>Новый комментарий</h3>
      <textarea placeholder='Как можно быстрее введите ваш комментарий'></textarea>
      <div className={cn('row')}>
        <Button style="primary" type="submit" title="Отправить" />
        <Button style="outline" type="button" title="Отмена" />
      </div>
    </form>
  );
}


export default memo(NewComment);
