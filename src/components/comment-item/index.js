import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

const LEVEL_SEEK = 30;
const MAX_LEFT_SEEK = 200;

function CommentItem({comment, childRender}) {

  const cn = bem('CommentItem');

  // const callbacks = {
  //   onAdd: (e) => props.onAdd(props.item._id),
  // }

  const paddingLeft = `${Math.min(comment.level * LEVEL_SEEK, MAX_LEFT_SEEK)}px`;
  const dateCreate = new Date(comment.dateCreate).toLocaleString();

  return (
    <div className={cn()} style={{paddingLeft}}>
      <div className={cn('top')}>
        <div className={cn('authorName')}>{comment.authorName}</div>
        <div className={cn('dateCreate')}>{dateCreate}</div>
        {/*<div>{comment._id}</div>*/}
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <div>{childRender(comment._id)}</div>

      {/*<pre key={comment._id}>{JSON.stringify(comment, null, 2)}</pre>*/}
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  // link: PropTypes.string,
  // onAdd: PropTypes.func,
  // labelCurr: PropTypes.string,
  // labelAdd: PropTypes.string
  childRender: PropTypes.func.isRequired,
};

// CommentItem.defaultProps = {
//   onAdd: () => {},
//   labelCurr: '₽',
//   labelAdd: 'Добавить'
// }

export default memo(CommentItem);
