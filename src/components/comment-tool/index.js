import {memo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function CommentTool({
  session, //check
  currentId,
  type,
  title,
  placeholder,
  //activeCommentTool,
  onClose,
  t
  //loginLink,
}) {
  const cn = bem('CommentTool');
  const [value, setValue] = useState('');

  // const onChange = (evt) => {
  //   setValue(evt.target.value);
  // }

  const callbacks = {
    onChange: (evt) => {
      setValue(evt.target.value);
    },
    onSubmit: useCallback((evt) => {
      evt.preventDefault();
      onClose();
    })
  }

  if (!session) {
    return (
      <div className={cn()}>
        {
          <Link to={'/login'} className={cn('link')}>
            {t('comment.login')}
          </Link>}
          {t(t('comment.loginDescription'))
        }
      </div>
    )
  }

  if (session) {
    return (
      <div className={[
        cn(),
        cn('padding-top_medium')
      ].join(' ')}>
        <p className={cn('title')}>{title}</p>
        <textarea
          className={cn('textarea')}
          placeholder={placeholder}
          value={value}
          onChange={callbacks.onChange}
        >
        </textarea>
        <div className={cn('controls')}>
          <button onClick={callbacks.onSubmit} className={cn('button')}>{t('comment.toolSend')}</button>
          {
            type === 'reply' &&
            <button onClick={onClose} className={cn('button')}>{t('comment.toolClose')}</button>
          }
        </div>
      </div>
    )
  }
};

CommentTool.propTypes = {
  session: PropTypes.bool,
  placeholder: PropTypes.string,
  activeCommentTool: PropTypes.bool,
  onClose: PropTypes.func,
  loginLink: PropTypes.string,
  t: PropTypes.func
};

CommentTool.defaultProps = {
  onClose: () => {
  },
  t: (text) => text
};

export default memo(CommentTool);