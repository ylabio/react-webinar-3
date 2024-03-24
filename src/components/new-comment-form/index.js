import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function NewCommentForm(props) {
  const cn = bem('NewCommentForm');
  return (
    <div className={cn()}>
      {props.exists ?
        <>
          <div className={cn('head')}>{props.title}</div>
          <form onSubmit={props.onSubmit}>
            <textarea className={cn('text')} value={props.commentText} onChange={props.onChange}></textarea>
            <div>
              <button className={cn('button')} type='submit'>Отправить</button>
              {props.isComment &&
                <button className={cn('button-cancel')} type='button' onClick={props.onCancel}>Отмена</button>
              }
            </div>
          </form>
        </> :
        <div className={cn('message')}><a href={props.link}>Войдите</a>, чтобы иметь возможность комментировать</div>
      }
    </div>
  );
}

NewCommentForm.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  commentText: PropTypes.string,
  exists: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func
};

NewCommentForm.defaultProps = {
  title: '',
  link: '',
  commentText: '',
  exists: false,
  onSubmit: () => {},
  onChange: () => {},
  onCancel: () => {},
  t: (text) => text
}

export default memo(NewCommentForm);
