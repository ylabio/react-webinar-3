import {memo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentTool({
  session,
  currentId,
  type,
  title,
  placeholder,
  onClose,
  onLogin,
  onSend,
  t
}) {
  const cn = bem('CommentTool');
  const [value, setValue] = useState('');

  const onCommentSend = () => {
    onSend(value, currentId, type);
  }

  if (!session) {
    return (
      <div className={cn()}>
        {
          <span onClick={onLogin} className={cn('link')}>
            {t('comment.login')}
          </span>
        }
        {
          type === 'article' && t('comment.loginCommentDescription')
        }
        {
          type === 'comment' && t('comment.loginReplyDescription')
        }
        {
          type === 'comment' && <span onClick={onClose} className={[cn('link'), cn('link_alternative')].join(' ')}>{t('comment.toolClose')}</span>
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
          onChange={(evt) => setValue(evt.target.value)}
        >
        </textarea>
        <div className={cn('controls')}>
          <button onClick={() => onCommentSend()} className={cn('button')}>{t('comment.toolSend')}</button>
          {
            type === 'comment' &&
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