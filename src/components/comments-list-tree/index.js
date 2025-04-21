import { memo } from 'react';
import CommentsNode from '../comments-node';
import PropTypes from 'prop-types';

function CommentsListTree(props) {
  const {
    t = text => text,
    data = [],
    addComment,
    activeNodeId,
    setNodeId,
    userId,
    exists,
    pathname,
    cancelComment,
  } = props;

  return (
    <>
      {data &&
        data[0]?.children.map(item => (
          <CommentsNode
            key={item._id}
            node={item}
            addComment={addComment}
            cancelComment={cancelComment}
            setNodeId={setNodeId}
            activeNodeId={activeNodeId}
            t={t}
            userId={userId}
            exists={exists}
            pathname={pathname}
          />
        ))}
    </>
  );
}

CommentsListTree.propTypes = {
  exists: PropTypes.bool,
  addComment: PropTypes.func,
  cancelComment: PropTypes.func,
  setNodeId: PropTypes.func,
  data: PropTypes.arrayOf(),
  activeNodeId: PropTypes.string,
  userId: PropTypes.string,
  pathname: PropTypes.string,
  t: PropTypes.func,
};

export default memo(CommentsListTree);
