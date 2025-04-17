import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CommentsTitle({ commentsCount }) {
  return <div className="Comments-title">Комментарии ({commentsCount})</div>;
}

CommentsTitle.propTypes = {
  comment: PropTypes.shape({
    commentsCount: PropTypes.number.isRequired,
  }),
};

export default memo(CommentsTitle);
