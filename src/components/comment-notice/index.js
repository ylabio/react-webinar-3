import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentNotice({text, children}) {
  return (
    <div className='CommentNotice'>
      {children[0]}
      <span>{text}</span>
      {children[1]}
    </div>
  )
}

CommentNotice.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

export default memo(CommentNotice);
