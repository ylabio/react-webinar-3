import { memo } from 'react';
import Spinner from '../../components/spinner';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import AddComment from '../add-comment';
import CommentsListTree from '../comments-list-tree';

function CommentsContent(props) {
  const { exists, waiting, comments, activeNodeId, id, addComment, setNodeId, count, pathname } =
    props;

  const cn = bem('CommentsContent');

  return (
    <Spinner active={waiting}>
      <div className={cn()}>
        <div className={cn('title')}>Комментарии ({count})</div>
        <CommentsListTree
          data={comments}
          setNodeId={setNodeId}
          addComment={addComment}
          activeNodeId={activeNodeId}
        />
        {exists ? (
          activeNodeId === 'main' && <AddComment id={id} addComment={addComment} />
        ) : (
          <div className={cn('text')}>
            <Link className={cn('link')} to={'/login'} state={{ back: pathname }}>
              Войдите
            </Link>
            , чтобы иметь возможность комментировать
          </div>
        )}
      </div>
    </Spinner>
  );
}

export default memo(CommentsContent);
