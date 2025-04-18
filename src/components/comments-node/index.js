import { memo } from 'react';
import './style.css';
import AddComment from '../add-comment';
import { formatDate } from '../../utils/formated-date';
import { cn as bem } from '@bem-react/classname';

function CommentsNode(props) {
  const { t = text => text, level = 0, node, setNodeId, activeNodeId, addComment } = props;

  const isCommentActive = activeNodeId === node._id;
  const paddingLeft = level === 0 ? '0' : '40px'; // отступ для вложенных комментариев

  const onAddComment = (id, text) => {
    addComment(id, text, 'comment');
  };

  const formatedDate = formatDate(node.dateCreate, {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const cn = bem('CommentsNode');

  return (
    <div style={{ paddingLeft }} className={cn()}>
      <div className={cn('item')}>
        <div className={cn('header')}>
          <div className={cn('title')}>{node.author.profile.name}</div>
          <div className={cn('date')}>{formatedDate}</div>
        </div>
        <div className={cn('text')}>{node.text}</div>
        <button
          disabled={isCommentActive}
          className={cn('button')}
          onClick={() => setNodeId(node._id)}
        >
          {t('Ответить')}
        </button>
      </div>

      {isCommentActive && <AddComment id={node._id} addComment={onAddComment} />}

      {node.children?.map(child => (
        <CommentsNode
          key={child._id}
          node={child}
          level={level + 1}
          setNodeId={setNodeId}
          activeNodeId={activeNodeId}
          addComment={addComment}
        />
      ))}
    </div>
  );
}

export default memo(CommentsNode);
