import { memo } from 'react';
import CommentsNode from '../comments-node';

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

export default memo(CommentsListTree);
