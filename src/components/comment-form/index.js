import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm(props) {

  const cn = bem('CommentForm');

  const [text, setText] = useState('');

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit(text);
      setText('');
    }
  }

  return (
    <div className={cn()}>
      { props.exists
          ? <form onSubmit={callbacks.onSubmit} disabled={props.disabled}>
              <h3>{props.title}</h3>
              <textarea rows='4' onChange={e => setText(e.target.value)} placeholder={props.placeholder} value={text}/>
              <div className={cn('buttons')}>
                <button type='submit'>{props.labelSend}</button>
                { props.isCancelable && <button onClick={props.onCancel}>{props.labelCancel}</button> }
              </div>
            </form>
          : <div className={cn('invite')}><Link to={props.inviteUrl}>Войдите</Link>, чтобы иметь возможность комментировать</div>
      }
    </div>
 
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  labelSend: PropTypes.string,
  labelCancel: PropTypes.string,
  isCancelable: PropTypes.bool,
  exists: PropTypes.bool,
  inviteUrl: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

CommentForm.defaultProps = {
  title: 'Новый комментарий',
  placeholder: 'Текст',
  labelSend: 'Отправить',
  labelCancel: 'Отмена',
  isCancelable: false,
  exists: false,
  inviteUrl: '/login/',
  disabled: false,
  onSubmit: () => {},
  onCancel: () => {}
}

export default memo(CommentForm);
