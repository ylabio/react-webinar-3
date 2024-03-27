import React, {useEffect, useState} from 'react';
import './style.css'
import {parseDate} from "../../utils/parse-date";
import CommentReplier from "../../containers/comment-replier";
import PropTypes from "prop-types";

const Comment = ({ data, isOwner, replierActive, setReplierComment, setReplierOn }) => {
  const style = isOwner ? {
    color: '#666'
  } : {}

  const onAnswerClick = () => {
    setReplierComment(data._id)
    setReplierOn(true)
  }

  return (
    <div className='Comment'>
      <div className='Comment-header'>
        <span style={style} className='Comment-name'>{data.author.profile.name}</span>
        <span className='Comment-date'>{parseDate(data.dateCreate)}</span>
      </div>
      <div className='Comment-body'>
        {data.text}
      </div>
      <div
        className='Comment-actions'
        onClick={onAnswerClick}
      >
        Ответить
      </div>
      {/*{replierActive === data._id && <CommentReplier parent={'comment'} />}*/}
    </div>
  );
};

Comment.propTypes = {
  data: PropTypes.object,
  isOwner: PropTypes.bool,
  replierActive: PropTypes.string,
  setReplierComment: PropTypes.func
}

Comment.defaultProps = {
  setReplierComment: () => {}
}

export default React.memo(Comment);
