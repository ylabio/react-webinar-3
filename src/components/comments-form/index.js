import { memo } from 'react';
import Button from '../button';
import Input from '../input';
import './style.css';

const CommentsForm = ({ onSubmit, value, onChange }) => {
  const onSubmitHandler = () => {
    onSubmit();
  };

  return (
    <div className="Comments-form">
      <span className="Comments-form-title">Новый комментарий</span>
      <Input theme="full" name="text" type="text" value={value?.text ?? ''} onChange={onChange} />
      <Button style="primary" title="Отправить" onClick={onSubmitHandler} />
    </div>
  );
};

export default memo(CommentsForm);
