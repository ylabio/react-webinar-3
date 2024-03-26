import { memo, useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function CommentItem({comment, date, setId, setActiveCommentId }) {

  const cn = bem('CommentItem');

  const commentRef = useRef(null);

  const handleClick = (id) => {
    setId(id);
    setActiveCommentId(id);
    scrollToComment();
  }

  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={ cn() } ref={commentRef}>
      <div className={ cn('wrapper') }>
        <p className={ cn('user') }>{comment.author.profile.name}</p>
        <p className={ cn('date') }>{date}</p>
      </div>
      <p className={ cn('text') }>{ comment.text }</p>
      <button className={ cn('button') } onClick={ () => handleClick( comment._id ) }>Ответить</button>
    </div>)
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  data: PropTypes.string,
  setId: PropTypes.func,
  setActiveCommentId: PropTypes.func
};

export default memo( CommentItem );