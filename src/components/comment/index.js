import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import React, { forwardRef } from 'react';

let Comment=forwardRef(({data,activeComment,isAuth,setActiveComment,resetCurrentForm,addAnswerComment,t,onSignIn,highlightedComment,setParentComment,parentComment},ref)=> {
  const cn = bem('Comment');
  const callbacks = {
    showForm:()=>{
      setParentComment(data.id)
      if(data.lastChildId){
        setActiveComment(data.lastChildId)
      }else{
        setActiveComment(data.id)
      }
    },
    addNewAnswerComment: (comment,id)=>addAnswerComment(comment,id)
  }

  return (
    <div ref={ref} className={cn() } style={{"marginLeft":data.indentation*20}}>
      <div className={cn('header')} >
        <span className={isAuth===data.author?cn('current_author'):cn('author')}>{data.author}</span>
        <span className={cn('date')}>{data.dateCreate}</span>
      </div>
      <div className={highlightedComment===data.id?cn('content_current'):cn('content')}>{data.text}</div>
      <span className={cn('answer')} onClick={callbacks.showForm}>{t('comment.answer')}</span>
      {data.id==activeComment && <CommentForm indentation={data.id==parentComment?1:0} parentComment={parentComment} t={t} isAuth={isAuth} resetCurrentForm={resetCurrentForm} addNewAnswerComment={callbacks.addNewAnswerComment} onSignIn={onSignIn}/>}
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
  activeComment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
