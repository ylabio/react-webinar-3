import {memo, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector as useReduxSelector, useDispatch } from 'react-redux';
//import useStore from '../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import shallowEqual from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import Spinner from '../../components/spinner';
import CommentsList from '../../components/comments-list';
import listToTree from '../../utils/list-to-tree';
import getNestedComments from '../../utils/comment-tree';

function CommentsContainer() {
  const params = useParams();
  const dispatch = useDispatch();
  const {t} = useTranslate();

  const session = useSelector(state => ({
    exist: state.session.exists,
    user: state.session.user
  }));

  const select = useReduxSelector(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waiting: state.comments.waiting,
  }), shallowEqual);

  const callbacks = {
    onReplyOpen: useCallback((id) => {
      //console.log(id);
      dispatch(commentsActions.openReply(id));
    }),
    onReplyClose: useCallback((id) => {
      dispatch(commentsActions.closeReply(id))
    })
  }

  const comments = listToTree(select.comments);

  return (
    <Spinner active={select.waiting}>
      {
        // comments !== undefined &&
        <CommentsList
          count={select.count}
          //items={comments}
          items={comments}
          session={session.exists}
          onReplyOpen = {callbacks.onReplyOpen}
          onReplyClose = {callbacks.onReplyClose}
          t={t}
        >
          {/* {
            select.comments.items &&
            listToTree(select.comments.items)[0]?.children.map(item => {
              return (
                <div key={item._id}>
                  <CommentItem
                    onReply={callbacks.onReply}
                    onClose={callbacks.onClose}
                    activeCommentTool={activeCommentTool}
                    commentData={item}
                    // session={storeSelect.session.exists}
                    session={storeSelect.session}
                    t={t}
                  />
                </div>
              )
            })
          } */}
        </CommentsList>
      }
    </Spinner>
  );
}

export default memo(CommentsContainer);