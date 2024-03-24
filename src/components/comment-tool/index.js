import {memo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function CommentTool({
  session = false, //check
  //activeCommentTool,
  onClose,
  //loginLink,
  t
}) {
  const cn = bem('CommentTool');
  const [value, setValue] = useState('');
  //const [renderCommentTool, setRenderCommentTool] = useState(!activeCommentTool);

  // const onChange = (evt) => {
  //   setValue(evt.target.value);
  // }

  const callbacks = {
    // onClose: useCallback(() => {
    //   setRenderCommentTool(activeCommentTool);
    //   onClose();
    // }),
    onChange: (evt) => {
      setValue(evt.target.value);
    },
    onSubmit: useCallback((evt) => {
      evt.preventDefault();
      onClose(); //id?
    })
  }
  //console.log(activeCommentTool);

  //console.log(session);

  if (!session) {
    return (
      <div className={cn()}>
        {
          // <Link to={loginLink} className={cn('link')}>
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
        // `${renderCommentTool && cn('padding-top_medium')}`
        cn('padding-top_medium')
      ].join(' ')}>
        <p className={cn('title')}>{t('comment.toolTitle')}</p>
        <textarea
          className={cn('textarea')}
          placeholder={t('comment.toolDefaultPlaceholder')}
          value={value}
          onChange={callbacks.onChange}
        >
        </textarea>
        <div className={cn('controls')}>
          <button onClick={callbacks.onSubmit} className={cn('button')}>{t('comment.toolSend')}</button>
          {/* {
            !activeCommentTool &&
            <button onClick={callbacks.onClose} className={cn('button')}>{t('comment.toolClose')}</button>
          } */}
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