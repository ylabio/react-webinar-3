import { memo } from 'react';
import Spinner from '../../components/spinner';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import AddComment from '../add-comment';
import CommentsListTree from '../comments-list-tree';
import SignInNotice from '../sign-in-notice';
import PropTypes from 'prop-types';

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
    t = text => text,
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
          t={t}
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

CommentsContent.propTypes = {
  exists: PropTypes.bool,
  waiting: PropTypes.bool,
  comment: PropTypes.arrayOf(),
  addComment: PropTypes.func,
  cancelComment: PropTypes.func,
  setNodeId: PropTypes.func,
  activeNodeId: PropTypes.string,
  count: PropTypes.number,
  id: PropTypes.string,
  userId: PropTypes.string,
  pathname: PropTypes.string,
  t: PropTypes.func,
};

export default memo(CommentsContent);
