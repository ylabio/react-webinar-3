import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentItem(props) {

  const {_id, author, dateCreate, text, level} = props.comment

  const callbacks = {
    openForm: () => props.openForm(_id),
  }

  const cn = bem('CommentItem')

  return (
    <div className={cn()} style={{paddingLeft: level * 30}}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <div className={cn('author')}>{author.profile.name}</div>
          <div className={cn('time')}>{dateCreate}</div>
        </div>
        <div className={cn('text')}>{text}</div>
        <div>
          <button className={cn('btn')} onClick={callbacks.openForm}>
            Ответить
          </button>
        </div>
      </div>
      {props.isActiveForm && props.form}
    </div>
  )
}

CommentItem.PropTypes = {}

export default React.memo(CommentItem);