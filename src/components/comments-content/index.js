import { memo } from 'react';
import Spinner from '../../components/spinner';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import AddComment from '../add-comment';
import CommentsListTree from '../comments-list-tree';
import SignInNotice from '../sign-in-notice';

function CommentsContent(props) {
  const {
    exists,
    waiting,
    comments,
    activeNodeId,
    id,
    addComment,
    cancelComment,
    setNodeId,
    count,
    pathname,
    userId,
  } = props;

  const cn = bem('CommentsContent');

  return (
    <Spinner active={waiting}>
      <div className={cn()}>
        <div className={cn('title')}>Комментарии ({count})</div>
        <CommentsListTree
          data={comments}
          setNodeId={setNodeId}
          addComment={addComment}
          cancelComment={cancelComment}
          activeNodeId={activeNodeId}
          userId={userId}
          exists={exists}
          pathname={pathname}
        />
      </div>
      {activeNodeId === 'main' && (exists ? (
        <AddComment id={id} cancelComment={cancelComment} addComment={addComment} />
      ) : (
        <SignInNotice pathname={pathname} />
      ))}
    </Spinner>
  );
}

export default memo(CommentsContent);
