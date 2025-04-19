import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import Button from '../button';
import './style.css';

function Comment({ comment, comments, level = 0 }) {
  // const { article, onAdd = () => {}, t = text => text } = props;
  const cn = bem('Comment');

  if (comment.isDeleted) return null;

  const children = comments.filter(
    (c) => c.parent._id === comment._id && c.parent._type === "comment" && !c.isDeleted
  );

  return (
    <div className={`mt-4 ${level > 0 ? `ml-${level * 4}` : ''}`}>
      <div className="">
        <div className="">
          <span className="">{comment.author.profile.name} </span>
          <span className="">
                {new Date(comment.dateCreate).toLocaleString()}
              </span>
        </div>
        <p className="">{comment.text}</p>
      </div>
      {children.map((child) => (
        <Comment
          key={child._id}
          comment={child}
          comments={comments}
          level={level + 1}
        />
      ))}
    </div>
  );

}

// Comment.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number,
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func,
// };

export default memo(Comment);
