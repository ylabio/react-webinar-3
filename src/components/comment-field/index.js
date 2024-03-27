import {memo} from 'react';
import Input from '../input';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentField({formData, commentsData, exists, t, onSignIn}) {
  const cn = bem('CommentField');

  const {changeParent, parentType, sendComment} = formData;
  const {commentText, setCommentText} = commentsData;

  const callbacks = {
    changeParent: () => changeParent('article', '')
  }

  let disabledCondition = commentText.length === 0 || commentText.trim() === ''
  let commentHeader = parentType === 'article' ? t('comment.newcomment') : t('comment.newanswer')
  let buttonStyle = parentType === 'article' ? cn('button') : cn('buttonComment')
  let notAuthorizedText = parentType === 'article' ? t('comment.opportunity') : t('comment.opportunitycomment')

  if (exists) {
    return (
      <div className={cn()}>
        <span className={cn('title')}>{commentHeader}</span>
        <Input theme='comment' type='textarea' placeholder={t('comment.text')} value={commentText} onChange={setCommentText} />
        <div>
        <button disabled={disabledCondition} className={buttonStyle} onClick={sendComment}>{t('comment.send')}</button>
        {parentType === 'comment' && <button className={buttonStyle} onClick={callbacks.changeParent}>{t('comment.cancel')}</button>}
        </div>
      </div>
    )
  } else {
      return (
        <div className={cn('formLink')}>
          <button className={cn('buttonLink')} onClick={() => onSignIn()}>{t('comment.login')}</button>
          {notAuthorizedText}
          {parentType === 'comment' && <button onClick={callbacks.changeParent} className={cn('cancel')}>{t('comment.cancel')}</button>}
        </div>
      )
  }
}

CommentField.propTypes = {
  formData: PropTypes.shape({
    sendComment: PropTypes.func,
    changeParent: PropTypes.func,
    parentType: PropTypes.string
  }),
  commentsData: PropTypes.shape({
    setCommentText: PropTypes.func,
    commentText: PropTypes.string,
  }),
  exists: PropTypes.bool,
  t: PropTypes.func
};

CommentField.defaultProps = {
  commentsData: {
    setCommentText: () => {},
    commentText: ''
  },
  formData: {
    changeParent: () => {},
    sendComment: () => {},
    parentType: 'article',
  }
}

export default memo(CommentField);
