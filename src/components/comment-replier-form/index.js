import React, {useMemo, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css'
import PropTypes from "prop-types";

const CommentReplierForm = ({ parent, setReplierActive, onCreate }) => {
  const style = parent === 'comment' ? {
    padding: 0,
    marginTop: '25px'
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
    <div style={style} className={cn()}>
      <span className={cn('header')}>Новый {parent === 'article' ? 'комментарий' : 'ответ'}</span>
      <textarea className={cn('field')} value={field} placeholder={'Напишите комментарий'}
                onChange={(e) => setField(e.target.value)} />
      <div className={cn('actions')}>
        <button onClick={onSubmitClick}>Отправить</button>
        {parent === 'comment' && <button onClick={onCancelClick}>Отмена</button>}
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
