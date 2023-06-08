import {memo} from 'react'
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';
import { normalizeDate } from '../../utils/normalizeDate';
import CommentsFormContainer from '../../containers/comments-form-container';

function Comment({id, commentKey, text, date, author, level, isMyComment, onReplyClick, onCancel, replyForm, t}) {
  const cn = bem('Comment');
  // не совсем понимаю, можно ли так сделать)
  const {day, month, year, time} = normalizeDate(date, t('locale'));

  return (
    <div className={cn()} style={{paddingLeft: `${30 * level}px` }} >

      <div className={cn('header')}>
        <span className={isMyComment ? cn('my-user-name') : cn('user-name')}>{author.profile.name}</span>
        <span className={cn('date')}>{`${day} ${t(month)} ${year} ${t('date.in')} ${time}`}</span>
      </div>

      <p className={cn('message')}>{text}</p>

      <button onClick={() => onReplyClick(commentKey)} className={cn('reply-button')}>{t('comments.reply')}</button>

      {replyForm.isOpen && replyForm.commentKey == commentKey && <CommentsFormContainer onCancel={onCancel} isReply={true} id={id}/>}
    </div>
  )
}

Comment.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string,
  level: PropTypes.number,
  author: PropTypes.shape({
    _id: PropTypes.string,
    profile: PropTypes.object
  }),
  isMyComment: PropTypes.bool,
  commentKey: PropTypes.string,
  t: PropTypes.func
}

Comment.defaultProps = {
  t: () => {}
}

export default memo(Comment)