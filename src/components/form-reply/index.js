import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

import PropTypes from 'prop-types';
function FormReply({to, onSendReply, onCloseReply, translate}) {

  const cn = bem('FormReply');

  const [form, setFormValue] = useState({});

  const callbacks = {
    onFormSubmit: (e) => {
      e.preventDefault();
      onSendReply(to, form);
      callbacks.resetForm();
    },
    onCloseReply: (e) => {
      e.preventDefault();
      callbacks.resetForm();
      onCloseReply();
    },
    resetForm: () => {
      setFormValue({
        text: "",
      })
    },
    onFormChange: (e) => {
      e.preventDefault();
      setFormValue({
        ...form,
        [e.target.name]: e.target.value,
      })
    },
    onFormReset: (e) => {
      e.preventDefault();
      callbacks.resetForm();
    }
  }

  return <form 
   onSubmit={callbacks.onFormSubmit} 
   onReset={callbacks.onFormReset} 
   className={cn()}
  >
    <label className={cn("label")}>
      {translate("comments.newReply")}
      <textarea 
        value={form.text} 
        onChange={callbacks.onFormChange}
        name="text"
        id="text"
        className={cn("textarea")} 
      />
    </label>
    <div className={cn('form-buttons')}>
      <button 
        type="submit" 
        className={cn("button")} 
      >
        {translate("comments.send")}
      </button>
      <button 
        type="reset" 
        className={cn("button")} 
        onClick={callbacks.onCloseReply}
      >
        {translate("comments.cancel")}
      </button>
    </div>      
  </form>

}

export default memo(FormReply);