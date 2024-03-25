import {memo, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentForm (props) {

  const cn = bem('CommentForm');

  const [form, setForm] = useState({text: '', cansel: false});

  const callbacks = {
    closeForm: (ev) => {
      ev.preventDefault();
      setForm({text: '', cansel: false});
      props.closeForm();
    },
    onSubmit: (ev) => {
      ev.preventDefault();
      props.onSubmit(form.text);
      setForm({text: '', cansel: false});
    }
  }

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <label className={cn('label')}>{props.label}</label>
      <textarea 
        className={cn('textarea')} placeholder={props?.placeholder} value={form.text} 
        // className={cn('textarea')} value={form.text} 
        onChange={(ev) => setForm({text: ev.target.value, cansel: true})}
      >
      </textarea>
      <div className={cn('action')}>
        <button className={cn('btn')} type='submit'>{props.btnSend}</button>
          {(props.showNow || form.cansel) && <button className={cn('btn')} onClick={callbacks.closeForm}>{props.btnCancel}</button>}
      </div>
    </form>
  );

}

CommentForm.propTypes = {
  label: PropTypes.string,
  btnSend: PropTypes.string,
  btnCancel: PropTypes.string,
  placeholder: PropTypes.any,
  showNow: PropTypes.bool,
  closeForm: PropTypes.func,
  onSubmit: PropTypes.func,
}

CommentForm.defaultProps = {
  closeForm: () => {
  },
  onSubmit: () => {
  },
  showNow: false,
  placeholder: ''
  // labelCurr: '₽',
  // labelAdd: 'Добавить'
}

export default memo(CommentForm);