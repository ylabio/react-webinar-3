import { memo } from 'react';
import Button from '../button';
import Input from '../input';

const CommentsForm = () => {
  return (
    <div className="Comments-form">
      <span className="Comments-form-title">Новый комментарий</span>
      <Input theme="full" />
      <Button style="primary" title="Отправить" />
    </div>
  );
};

export default memo(CommentsForm);
