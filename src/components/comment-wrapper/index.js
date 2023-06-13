import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
function CommentWrapper(props) {
  const max = 10;
  const cn = bem('CommentWrapper');
  return (
    <div className={cn({ reset: props.level > max })}>{props.children}</div>
  );
}

CommentWrapper.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number,
};
export default CommentWrapper;
