import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import React, { forwardRef } from 'react';

let Comment=forwardRef(({data,current,isAuth,setActiveComment,resetCurrentForm,addAnswerComment,t,onSignIn,highlightedComment},ref)=> {
  const cn = bem('Comment');
  const callbacks = {
    showForm:()=>setActiveComment(data.id),
    addNewAnswerComment: comment=>addAnswerComment(comment,data.id)
  }

  return (
    <div ref={ref} className={cn() } style={{"marginLeft":data.indentation*20}}>
      <div className={cn('header')} >
        <span className={isAuth===data.author?cn('current_author'):cn('author')}>{data.author}</span>
        <span className={cn('date')}>{data.dateCreate}</span>
      </div>
      <div className={highlightedComment===data.id?cn('content_current'):cn('content')}>{data.text}</div>
      <span className={cn('answer')} onClick={callbacks.showForm}>{t('comment.answer')}</span>
      {data.id==current && <CommentForm t={t} isAuth={isAuth} resetCurrentForm={resetCurrentForm} addNewAnswerComment={callbacks.addNewAnswerComment} onSignIn={onSignIn}/>}
    </div>
  );
})

Comment.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.string,
    text:PropTypes.string,
    dateCreate: PropTypes.string,
    indentation:PropTypes.number
  }).isRequired,
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAuth: PropTypes.string,
  setActiveComment: PropTypes.func,
  resetCurrentForm: PropTypes.func,
  addAnswerComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

Comment.defaultProps = {
  setActiveComment: (id) => {},
  resetCurrentForm: () => {},
  addAnswerComment: (comment) => {},
  t: () => {},
  onSignIn: () => {},
}

export default memo(Comment);
