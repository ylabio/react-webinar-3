import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function CommentHead({title, count}){
  return (
    <div className='CommentHead'>
        <span>{title} ({count})</span>
    </div>
  )
}

CommentHead.propTypes = {
  title: PropTypes.node,
};

export default memo(CommentHead);
