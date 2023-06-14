import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsError({error, t}) {
  const cn = bem('CommentsError');
  return (
    <div className={cn()}>
        {t(error)}
    </div>
  );
}

CommentsError.propTypes = {
  error: PropTypes.number,
  t: PropTypes.func
};

CommentsError.defaultProps = {
  error: "Error",
  t: (text) => text
}

export default memo(CommentsError);
