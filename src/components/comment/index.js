import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';

function Comment({data,current,isAuth,setActiveComment,resetCurrentForm,addAnswerComment,t}) {
  const cn = bem('Comment');

  const callbacks = {
    showForm:()=>setActiveComment(data.id),
    addNewAnswerComment: comment=>addAnswerComment(comment,data.id)
  }

  return (
    <div className={cn() } style={{"marginLeft":data.indentation*20}}>
      <div className={cn('header')} >
        <span className={cn('author')}>{data.author}</span>
        <span className={cn('date')}>{data.dateCreate}</span>
      </div>
      <div className={cn('content')}>{data.text}</div>
      <span className={cn('answer')} onClick={callbacks.showForm}>{t('comment.answer')}</span>
      {data.id==current && <CommentForm t={t} isAuth={isAuth} resetCurrentForm={resetCurrentForm} addNewAnswerComment={callbacks.addNewAnswerComment}/>}
    </div>
  );
}

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
  t: PropTypes.func,
};

Comment.defaultProps = {
  setActiveComment: (id) => {},
  resetCurrentForm: () => {},
  addAnswerComment: (comment) => {},
  t: () => {},
}

export default memo(Comment);
