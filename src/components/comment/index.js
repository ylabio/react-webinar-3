import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';

function Comment({author,text,dateCreate}) {
  console.log(dateCreate)
  const cn = bem('Comment');

  const callbacks = {
    // onAdd: (e) => props.onAdd(props.item._id),
  }

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('author')}>{author}</span>
        <span className={cn('date')}>{dateCreate}</span>
      </div>
      <div className={cn('content')}>{text}</div>
      <span className={cn('answer')}>Ответить</span>
    </div>
  );
}

Comment.propTypes = {

};

Comment.defaultProps = {
}

export default memo(Comment);
