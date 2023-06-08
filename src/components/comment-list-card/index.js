import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentItem from "../comment-item";

function CommentListCard({commentList, commentChildRender, commentArticleRender}) {
  const cn = bem('CommentListCard');

  return (
    <>
      <div className={cn()}>
        <div className={cn('title')}>Комментарии ({commentList.length})</div>
        {commentList.map((comment) => (
          <CommentItem comment={comment} key={comment._id} childRender={commentChildRender}/>))}
        <>{commentArticleRender()}</>
      </div>
    </>
  );
}

CommentListCard.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  })).isRequired,

  commentChildRender: PropTypes.func.isRequired,
  commentArticleRender: PropTypes.func.isRequired,
};


export default memo(CommentListCard);
