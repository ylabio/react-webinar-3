import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import formatDate from "../../utils/format-date";

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
          <div className={cn('time')}>{formatDate(dateCreate)}</div>
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

CommentItem.PropTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.shape({profile: PropTypes.shape({name: PropTypes.string})}),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    level: PropTypes.number
  }).isRequired,
  type: PropTypes.oneOf(['comment', 'article']),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  closeForm: PropTypes.func,
  onSubmit: PropTypes.func,
}

CommentItem.defalutProps = {
  closeForm: () => {},
  onSubmit: () => {},
}

export default React.memo(CommentItem);