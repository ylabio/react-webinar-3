import {memo, useCallback, useState, useEffect} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector as useReduxSelector, useDispatch } from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import shallowEqual from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import Spinner from '../../components/spinner';
import CommentsList from '../../components/comments-list';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentItem from '../../components/comment-item';
import CommentTool from '../../components/comment-tool';

function CommentsContainer() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslate();

  const [currentCommentId, setCurrentCommnetId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const session = useSelector(state => ({
    exist: state.session.exists,
    user: state.session.user
  }));

  useEffect(() => {
    scrollToActiveId();
  }, [activeId]);

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useReduxSelector(state => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
  }), shallowEqual);

  const callbacks = {
    onReplyOpen: useCallback((id) => {
      setCurrentCommnetId(id);
    }, [setCurrentCommnetId]),
    onReplyClose: useCallback(() => {
      setCurrentCommnetId(null);
    }, [setCurrentCommnetId]),
    onLogin: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    onSend: useCallback((value, parentId, type) => {
      if (value.trim()) {
        dispatch(commentsActions.send({
          text: value,
          parent: { _id: parentId, _type: type}
        }));
      }
      setCurrentCommnetId(null);
    }, [])
  };

  const scrollToActiveId = () => {
    if (activeId) {
      const commentElement = document.getElementById(activeId);
      if (commentElement) {
        commentElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  }

  return (
    <Spinner active={select.waiting}>
      {
        <CommentsList
          count={select.count}
          t={t}
        >
          {
            select.comments &&
            treeToList(listToTree(select.comments))[0]?.children.map(item => {

              return (
                <div key={item._id}>
                  <CommentItem
                    onReply={callbacks.onReplyOpen}
                    onClose={callbacks.onReplyClose}
                    onLogin={callbacks.onLogin}
                    onSend={callbacks.onSend}
                    commentData={item}
                    session={session}
                    currentId={currentCommentId}
                    setActiveId={setActiveId}
                    t={t}
                  />
                </div>
              )
            })
          }
          {
            currentCommentId === null &&
            <CommentTool
              session={session.exist}
              currentId={params.id}
              onLogin={callbacks.onLogin}
              onSend={callbacks.onSend}
              type='article'
              title={t('comment.toolTitle')}
              placeholder={t('comment.toolDefaultPlaceholder')}
              t={t}
            />
          }
        </CommentsList>
      }
    </Spinner>
  );
}

export default memo(CommentsContainer);