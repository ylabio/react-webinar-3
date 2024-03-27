import { memo, useState, forwardRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

import PropTypes from 'prop-types';
const FormReply = forwardRef(function FormReply({
  to,
  offset,
  onSendReply, 
  onCloseReply, 
  t},
  ref
) {

  const cn = bem('FormReply');

  const getOffsetClass = (offset) => {
    return cn(`offset-${Math.min(Math.max(offset - 1, 0), 3)}`);
  };

  const [form, setFormValue] = useState({text: ""});

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

  return 
    <li className={cn('list-element')}>  
      <form
       ref={ref}
       onSubmit={callbacks.onFormSubmit} 
       onReset={callbacks.onFormReset} 
       className={`${cn()} ${getOffsetClass(offset)}`}
      >
        <label className={cn("label")}>
          {t.translate("comments.newReply")}
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
            disabled={form.text.trim().length === 0}
            className={cn("button")} 
          >
            {t.translate("comments.send")}
          </button>
          <button 
            type="reset" 
            className={cn("button")} 
            onClick={callbacks.onCloseReply}
          >
            {t.translate("comments.cancel")}
          </button>
        </div>      
      </form>
    </li>

});

export default FormReply;