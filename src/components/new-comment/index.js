import { memo, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NewComment({ isAnswer, title, postComment, answerComment, closeAnswerForm, status, t}) {
  const cn = bem('NewComment');

  const textRef = useRef(null);

  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    if (status === 'success') {
      setCommentContent('')
    }
  }, [status]);

  useEffect(() => {
    if (isAnswer) {
      // textRef.current.focus()
      textRef.current.scrollIntoView({block: "center", behavior: "smooth"});
    }
  }, [isAnswer]);

  const callbacks = {
    postComment: () => {
      if (commentContent.trim() !== '') postComment(commentContent);
    },
    answerComment: () => {
      if (commentContent.trim() !== '') answerComment(commentContent);
      closeAnswerForm()
    },
    closeAnswerForm: () => closeAnswerForm(),

  }

  return (
    <div className={cn()}>
      <label className={cn('label')}>{title}
        <textarea
          name='postContent'
          defaultValue={commentContent}
          rows={4}
          onChange={e => setCommentContent(e.target.value)}
        />
      </label >
      <div className={cn('buttons-block')}>
        {isAnswer
          ? <button ref={textRef} type='submit' onClick={callbacks.answerComment}>{t('comments.send')}</button>
          : <button type='submit' onClick={callbacks.postComment}>{t('comments.send')}</button>
        }

        {isAnswer && <button type='reset' onClick={callbacks.closeAnswerForm}>{t('comments.cancel')}</button>}
      </div>
    </div>
  );
}

NewComment.propTypes = {
  isAnswer: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
  postComment: PropTypes.func,
  answerComment: PropTypes.func,
  closeAnswerForm: PropTypes.func,
  t: PropTypes.func,
};


export default memo(NewComment);
