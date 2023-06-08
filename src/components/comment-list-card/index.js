import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentItem from "../comment-item";
import Item from "../item";

function CommentListCard({commentList, childRender}) {
  const cn = bem('CommentListCard');



  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({commentList.length})</div>
      {commentList.map((comment) => (<CommentItem comment={comment} key={comment._id} childRender={childRender}/>))}
    </div>
  );
}

CommentListCard.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // description: PropTypes.string,
    // madeIn: PropTypes.object,
    // category: PropTypes.object,
    // edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // price: PropTypes.number
  })).isRequired,
  // onAdd: PropTypes.func,
  // t: PropTypes.func
  childRender: PropTypes.func.isRequired,
};

// CommentListCard.defaultProps = {
//   onAdd: () => {},
//   t: (text) => text
// }

export default memo(CommentListCard);
