import { memo } from "react";
import PropTypes from 'prop-types';

import "./style.css";

const CommentList = ({ comments, renderItem }) => {
  return (
    <ul className='CommentList'>{
      comments?.map(comment =>
        <li key={comment._id} className='CommentItem'>
          {renderItem(comment)}
        </li>
      )}
    </ul>
  )
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  renderItem: PropTypes.func.isRequired
};

export default memo(CommentList);