import React, {useMemo, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css'
import PropTypes from "prop-types";

const CommentReplierForm = ({ parent, setReplierActive, onCreate, tt }) => {
  const style = parent === 'comment' ? {
    padding: 0,
    margin: '25px 0',
  } : {}

  const [field, setField] = useState('')

  const cn = bem('CommentReplierForm')

  const onCancelClick = () => {
    setReplierActive('article')
  }

  const onSubmitClick = () => {
    if (field && field.trim()) {
      onCreate(field)
      setReplierActive('article')
    }

  }

  return (
    <div style={style} id={parent === 'comment' ? 'replyTo' : ''} className={cn()}>
      <span className={cn('header')}>{tt('comments.replierTitle')} {parent === 'article' ? tt('comments.replierTitleComment') : tt('comments.replierTitleReply')}</span>
      <textarea className={cn('field')} value={field} placeholder={tt('comments.placeholder')}
                onChange={(e) => setField(e.target.value)} />
      <div className={cn('actions')}>
        <button onClick={onSubmitClick}>{tt('comments.send')}</button>
        {parent === 'comment' && <button onClick={onCancelClick}>{tt('comments.cancel')}</button>}
      </div>
    </div>
  );
};

CommentReplierForm.propTypes = {
  parent: PropTypes.string,
  setReplierActive: PropTypes.func,
  onCreate: PropTypes.func,
}

CommentReplierForm.defaultProps = {
  setReplierActive: () => {},
  onCreate: () => {},
}

export default React.memo(CommentReplierForm);
