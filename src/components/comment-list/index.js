import { memo } from 'react';
import PropTypes from 'prop-types';
import CommentItem from '../comment-item';
import './style.css';

function CommentList({formData, commentsData, children, currentUser, t}) {
  const {comments} = commentsData;

  return (
    comments.map((item) => (
      <div key={item._id}>
        <CommentItem
          t={t}
          formData={formData}
          commentsData={commentsData}
          currentUser={currentUser}
          comment={item}
          children={children}
        />
      </div>
    ))
  )
}

CommentList.propTypes = {
  formData: PropTypes.object,
  commentsData: PropTypes.shape({
    comments: PropTypes.array
  }),
  children: PropTypes.node,
  currentUser: PropTypes.string,
  t: PropTypes.func
};

CommentList.defaultProps = {
  commentsData: {
    comments: []
  },
  currentUser: ''
}

export default memo(CommentList);