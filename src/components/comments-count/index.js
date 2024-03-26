import PropTypes from "prop-types";
import { memo } from "react";
import './style.css';

function CommentsCount({count}) {
  return (
    <h2 className={'CommentsCount'}>Комментарии ({count})</h2>
  )
}

CommentsCount.propTypes = {
  count: PropTypes.number,
};

export default memo(CommentsCount);
