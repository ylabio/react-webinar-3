import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsCounter({count, t}) {
  const cn = bem('CommentsCounter');
  return (
    <div className={cn()}>
        {t("comments.count")} ({count})
    </div>
  );
}

CommentsCounter.propTypes = {
    count: PropTypes.number,
  t: PropTypes.func
};

CommentsCounter.defaultProps = {
    count: 0,
  t: (text) => text
}

export default memo(CommentsCounter);
