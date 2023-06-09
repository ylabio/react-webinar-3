import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {dateFormat} from "../../utils/time-format";

const LEVEL_SEEK = 30;
const MAX_LEFT_SEEK = 600;

function CommentItem({comment, childRender}) {

  const cn = bem('CommentItem');

  const paddingLeft = `${Math.min(comment.level * LEVEL_SEEK, MAX_LEFT_SEEK)}px`;
  // const dateCreate = new Date(comment.dateCreate).toLocaleString();
  const dateCreate = dateFormat(comment.dateCreate);

  if (comment._id === 'form') {
    return <div style={{paddingLeft}}>{childRender(comment.parent._id)}</div>
  }

  return (
    <div className={cn()} style={{paddingLeft}}>
      <div className={cn('top')}>
        <div className={`${cn('authorName')} ${comment.itsMe ? cn('authorName-itsMe') : ''}`}>{comment.authorName}</div>
        <div className={cn('dateCreate')}>{dateCreate}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <div>{childRender(comment._id, true)}</div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  childRender: PropTypes.func.isRequired,
};


export default memo(CommentItem);
