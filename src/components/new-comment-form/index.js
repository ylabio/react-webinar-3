import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function NewCommentForm(props) {
  const cn = bem('NewCommentForm');
  return (
    <div className={cn()} style={{marginLeft: (props.space - 1)*(-30) + 'px'}}>
      {props.exists ?
        <>
          <div className={cn('head')}>{props.title}</div>
          <form onSubmit={props.onSubmit}>
            <textarea className={cn('text')} value={props.commentText} onChange={props.onChange}></textarea>
            <div>
              <button className={cn('button')} type='submit'>{props.t('commentForm.send')}</button>
              {props.isComment &&
                <button className={cn('button-cancel')} type='button' onClick={props.onCancel}>{props.t('commentForm.cancel')}</button>
              }
            </div>
          </form>
        </> :
        <div className={cn('message')}>
          <button className={cn('button-signIn')} type='button' onClick={props.onSignIn}>{props.t('commentForm.messageLink')}</button>
          {
            props.isComment ?
            <>
              {` ${props.t('commentForm.messageAnswer')}`}
              <button className={cn('button-answer')} type='button' onClick={props.onCancel}>{props.t('commentForm.cancel')}</button>
            </> :
            ` ${props.t('commentForm.message')}`
          }
        </div>
      }
    </div>
  );
}

NewCommentForm.propTypes = {
  title: PropTypes.string,
  commentText: PropTypes.string,
  exists: PropTypes.bool,
  onSignIn: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func
};

NewCommentForm.defaultProps = {
  title: '',
  commentText: '',
  exists: false,
  onSignIn: () => {},
  onSubmit: () => {},
  onChange: () => {},
  onCancel: () => {},
  t: (text) => text
}

export default memo(NewCommentForm);
