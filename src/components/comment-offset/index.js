import { forwardRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

const CommentOffset = forwardRef((maxOffset, offset, ref, children) => {
  useLayoutEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
  }, [ref]);

  const padding = offset > maxOffset ? `${offset * 40}px` : `${(offset + 1) * 40}px`;

  return (
    <div ref={ref} style={{ paddingLeft: padding }}>
      {children}
    </div>
  );
});

CommentOffset.propTypes = {
  scrollTo: PropTypes.bool,
  offset: PropTypes.number,
  maxNesting: PropTypes.number,
  children: PropTypes.node,
};
export default CommentOffset;
