import { memo } from 'react';
import CommentsNode from '../comments-node';

function CommentsListTree(props) {
  const { t = text => text, data = [], addComment, activeNodeId, setNodeId } = props;

  return (
    <>
      {data &&
        data[0]?.children.map(item => (
          <CommentsNode
            key={item._id}
            node={item}
            addComment={addComment}
            setNodeId={setNodeId}
            activeNodeId={activeNodeId}
            t={t}
          />
        ))}
    </>
  );
}

export default memo(CommentsListTree);
