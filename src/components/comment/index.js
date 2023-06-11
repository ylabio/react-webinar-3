import {memo} from 'react'
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';
import { normalizeDate } from '../../utils/normalizeDate';
import CommentsFormContainer from '../../containers/comments-form-container';

function Comment({id, commentKey, text, date, author, level, isMyComment, onReplyClick, t}) {
  const cn = bem('Comment');

  const {day, month, year, time} = normalizeDate(date, t('locale'));

  const paddings = level >= 8 ? 8 : level;
  const authorName = isMyComment ? t('comments.you') : author.profile?.name;

  return (
    <div className={cn()} style={{paddingLeft: `${30 * paddings}px` }} >

      <div className={cn('header')}>
        <span className={isMyComment ? cn('my-user-name') : cn('user-name')}>{authorName}</span>
        <span className={cn('date')}>{`${day} ${t(month)} ${year} ${t('date.in')} ${time}`}</span>
      </div>

      <p className={cn('message')}>{text}</p>

      <button onClick={() => onReplyClick(id, author._id, commentKey)} className={cn('reply-button')}>{t('comments.reply')}</button>
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