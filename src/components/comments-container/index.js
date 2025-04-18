import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsConatiner({ children, title = '', count = 0 }) {
  const cn = bem('CommentsConatiner');

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>
        {title} ({count})
      </h2>
      {children}
    </div>
  );
}

// CommentsConatiner.propTypes = {
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

export default memo(CommentsConatiner);
