import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm(props) {

  const cn = bem('CommentForm');

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      if (props.text.trim()) {
        props.onSubmit();
      } else {
        alert(props.t('comment.emptyTextAlert'));
      }
    },
    onCancel: (e) => {
      e.preventDefault();
      props.onCancel();
    },
    onSignIn: (e) => {
      e.preventDefault();
      props.onSignIn();
    }
  }

  return (
    <div className={cn({theme: props.theme})}>
      { props.exists
          ? <form id='commentForm' onSubmit={callbacks.onSubmit} disabled={props.disabled}>
              <h3>{props.title}</h3>
              <textarea rows='4' onChange={e => { props.setText(e.target.value); }} placeholder={props.t('comments.text')} value={props.text} autoFocus={props.autoFocus}/>
              <div className={cn('buttons')}>
                <button type='submit'>{props.t('comments.send')}</button>
                { props.isCancelable && <button onClick={props.onCancel}>{props.t('comments.cancel')}</button> }
              </div>
            </form>
          : <div id='commentForm' className={cn('invite')}>
              <a href="#" onClick={callbacks.onSignIn} className={cn('anchor')}>{props.t('comments.inviteAnchor')}</a>{props.t(props.isCancelable ? 'comments.inviteAnswer' : 'comments.inviteComment').replace(props.t('comments.inviteAnchor'), '')}
              { props.isCancelable && <>{ "\u00a0" }<a href="#" onClick={callbacks.onCancel} className={cn('cancel')}>{props.t('comments.cancel')}</a></> }
            </div>
      }
    </div>
 
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  autoFocus: PropTypes.bool,
  isCancelable: PropTypes.bool,
  exists: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  t: PropTypes.func,
  setText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onSignIn: PropTypes.func
};

CommentForm.defaultProps = {
  title: 'Новый комментарий',
  theme: '',
  autoFocus: false,
  isCancelable: false,
  exists: false,
  disabled: false,
  t: (text) => text,
  onSubmit: () => {},
  onCancel: () => {},
  onSignIn: () => {}
}

export default memo(CommentForm);
