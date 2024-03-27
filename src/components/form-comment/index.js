import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormComment({onSendComment, t}) {

  const cn = bem('FormComment');

  const [form, setFormValue] = useState({text: ""});

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
      {t.translate("comments.newComment")}
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
        disabled={form.text.trim().length === 0}
        className={cn("button")}
      >
        {t.translate("comments.send")}
      </button>
    </div>
  </form>
}

export default memo(FormComment);