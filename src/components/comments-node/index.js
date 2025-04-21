import { memo } from 'react';
import './style.css';
import AddComment from '../add-comment';
import { formatDateForComments } from '../../utils/formated-date';
import { cn as bem } from '@bem-react/classname';
import SignInNotice from '../sign-in-notice';

function CommentsNode(props) {
  const {
    t = text => text,
    level = 0,
    node,
    setNodeId,
    activeNodeId,
    addComment,
    cancelComment,
    userId,
    exists,
    pathname,
  } = props;

  const isAuthor = node.author._id === userId;
  const isFormActive = activeNodeId === node._id;

  const LIMIT_NESTING = 6; // ограничиваем вложенность комментариев
  const paddingLeft = level === 0 || level > LIMIT_NESTING ? '0' : '40px'; // отступ для вложенных комментариев

  const formatedDate = formatDateForComments(node.dateCreate);

  const onAddComment = (id, text) => {
    addComment(id, text, 'comment');
  };

  const cn = bem('CommentsNode');

  return (
    <div style={{ paddingLeft }} className={cn()}>
      <div className={cn('item')}>
        <div className={cn('header')}>
          <div className={cn(isAuthor ? 'authorTitle' : 'title')}>{node.author.profile.name}</div>
          <div className={cn('date')}>{formatedDate}</div>
        </div>
        <div className={cn('text')}>{node.text}</div>
        <button
          disabled={isFormActive}
          className={cn('button')}
          onClick={() => setNodeId(node._id)}
        >
          {t('Ответить')}
        </button>
      </div>

      {node.children?.map(child => (
        <CommentsNode
          key={child._id}
          node={child}
          level={level + 1}
          setNodeId={setNodeId}
          activeNodeId={activeNodeId}
          addComment={addComment}
          cancelComment={cancelComment}
          userId={userId}
          exists={exists}
          pathname={pathname}
        />
      ))}

      <div style={{ paddingLeft: '40px' }}>
        {isFormActive &&
          (exists ? (
            <AddComment id={node._id} cancelComment={cancelComment} addComment={onAddComment} />
          ) : (
            <SignInNotice pathname={pathname} />
          ))}
      </div>
    </div>
  );
}

export default memo(CommentsNode);
