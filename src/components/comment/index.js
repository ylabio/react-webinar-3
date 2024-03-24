import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';
import CommentForm from '../comment-form';

function Comment({author,text,dateCreate,id,current,isAuth,setActiveComment,resetCurrentForm,addAnswerComment,indentation}) {
  const cn = bem('Comment');

  function showForm(){
    setActiveComment(id)
  }
  function addNewAnswerComment(comment){
    addAnswerComment(comment,id)
  }

  const callbacks = {
    // onAdd: (e) => props.onAdd(props.item._id),
  }

  return (
    <div className={cn() } style={{"marginLeft":indentation*20}}>
      <div className={cn('header')} >
        <span className={cn('author')}>{author}</span>
        <span className={cn('date')}>{dateCreate}</span>
      </div>
      <div className={cn('content')}>{text}</div>
      <span className={cn('answer')} onClick={showForm}>Ответить</span>
      {id==current && <CommentForm isAuth={isAuth} resetCurrentForm={resetCurrentForm} addNewAnswerComment={addNewAnswerComment}/>}
    </div>
  );
}

Comment.propTypes = {

};

Comment.defaultProps = {
}

export default memo(Comment);
