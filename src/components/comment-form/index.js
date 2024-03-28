import {memo, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import checkWhitespaceForm from '../../utils/check-whitespace-form';
import './style.css';

function CommentForm (props) {

  const cn = bem('CommentForm');

  const [form, setForm] = useState({text: '', cansel: false});
  const [error, setError] = useState(false);

  const callbacks = {
    closeForm: (ev) => {
      ev.preventDefault();
      setForm({text: '', cansel: false});
      setError(false);
      props.closeForm();
    },
    onSubmit: (ev) => {
      ev.preventDefault();
      const errorForm = checkWhitespaceForm(form.text);
      setError(errorForm);
      if (!errorForm) {
        props.onSubmit(form.text);
        setForm({text: '', cansel: false});
      } else {
        setForm({text: '', cansel: true});
      }
    }
  }

  const onChange = (ev) => {
    setForm({text: ev.target.value, cansel: true});
    setError(false);
  }

  return (
    <form className={cn({theme: props.theme})} onSubmit={callbacks.onSubmit}>
      <label className={cn('label')}>{props.label}</label>
      <textarea 
        className={cn('textarea')} placeholder={props?.placeholder} value={form.text} 
        onChange={onChange}
      >
      </textarea>
      {error && <div className={cn('error')}>Заполните поле!</div>}
      <div className={cn('action')}>
        <button className={cn('btn')} type='submit'>{props.btnSend}</button>
          {(props.showNow || form.cansel || error) && <button className={cn('btn')} onClick={callbacks.closeForm}>{props.btnCancel}</button>}
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
  theme: PropTypes.oneOf(['', 'item']),
}

CommentForm.defaultProps = {
  closeForm: () => {
  },
  onSubmit: () => {
  },
  showNow: false,
  placeholder: '',
  theme: ''
  // labelAdd: 'Добавить'
}

export default memo(CommentForm);