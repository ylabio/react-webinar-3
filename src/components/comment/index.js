import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import SideLayout from "../side-layout";
import { formatDateTime} from "../../utils/date-format";
import useTranslate from "../../hooks/use-translate";

function Comment({comment, user, answer, level, id, isUser}) {
  const {t} = useTranslate();
  const author = comment.author.profile.name
  const cn = bem('Comment');
  const date = formatDateTime(comment?.dateCreate)
  return (
    <div style={{ paddingLeft: 30 * level + 'px' }} className={cn()}>
      <SideLayout side={'start'}>
        <span className={isUser ? cn('user') : cn('author') }>{author}</span>
        <span className={cn('date')}>{date}</span>
      </SideLayout>
      <div className={cn('text')}>{comment.text}</div>
      <span
        className={cn('answer')}
        onClick={() => answer(id, user.name)}
      >
        {t('comment.answer')}
      </span>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string
  }),
  answer: PropTypes.func,
};

Comment.defaultProps = {

};

export default memo(Comment);