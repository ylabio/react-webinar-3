import {memo, useCallback, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector as useReduxSelector, useDispatch } from 'react-redux';
//import useStore from '../hooks/use-store';
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
  const {t} = useTranslate();

  const [currentCommentId, setCurrentCommnetId] = useState(null);

  const session = useSelector(state => ({
    exist: state.session.exists,
    user: state.session.user
  }));

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
      //dispatch(commentsActions.openReply(id));
      // setState({
      //   ...state,
      //   comments: comments.map(item => {
      //   if (item._id === id) {
      //     return {...item, replyOpen: true};
      //   }
      //   if (item.replyOpen && item._id !== id) {
      //     return {...item, replyOpen: false};
      //   }
      //   return item;
      //   }),
      //   isCommentToolActive: false
      // })
      setCurrentCommnetId(id)
    }, [setCurrentCommnetId]),
    onReplyClose: useCallback(() => {
      //dispatch(commentsActions.closeReply(id))
      // setState({
      //   ...state,
      //   comments: comments.map(item => {
      //     if (item.replyOpen) {
      //       return {...item, replyOpen: false};
      //     }
      //     return item;
      //   }),
      //   isCommentToolActive: true
      // })
      setCurrentCommnetId(null)
    }, [setCurrentCommnetId])
  }

  //select.comments && console.log(treeToList(listToTree(select.comments)));

  return (
    <Spinner active={select.waiting}>
      {
        <CommentsList
          count={select.count}
          t={t}
        >
          {
            select.comments &&
            // treeToList(listToTree(select.comments)).filter(item => item._id).map(item => {
            treeToList(listToTree(select.comments))[0].children.map(item => {

              return (
                <div key={item._id}>
                  <CommentItem
                    onReply={callbacks.onReplyOpen}
                    onClose={callbacks.onReplyClose}
                    //activeCommentTool={activeCommentTool}
                    commentData={item}
                    // session={storeSelect.session.exists}
                    session={session.exist}
                    currentId={currentCommentId}
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