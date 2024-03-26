import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormComment({onSendComment, translate}) {

  const cn = bem('FormComment');

  const [form, setFormValue] = useState({});

  const callbacks = {
    onFormSubmit: (e) => {
      e.preventDefault();
      onSendComment(form);
      callbacks.resetForm();
    },
    onFormChange: (e) => {
      e.preventDefault();
      setFormValue({
        ...form,
        [e.target.name]: e.target.value,
      })
    },
    resetForm: () => {
      setFormValue({
        text: "",
      })
    },
  }
  
  return <form 
    onSubmit={callbacks.onFormSubmit}
    className={cn()}
  >
    <label className={cn("label")}>
      {translate("comments.newComment")}
    </label>
    <textarea 
      value={form.text} 
      onChange={callbacks.onFormChange}
      name="text"
      id="text"
      className={cn("textarea")} 
    />
    <div className={cn("form-buttons")}>
      <button 
        type="submit"
        className={cn("button")}
      >
        {translate("comments.send")}
      </button>
    </div>
  </form>
}

export default memo(FormComment);