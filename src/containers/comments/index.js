import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import useInit from '../../hooks/use-init';
import Spinner from '../../components/spinner';
import ArticleComments from '../../components/article-comments';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import dateFormat from '../../utils/date-format';

function Comments() {
	const dispatch = useDispatch();
	const params = useParams();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
		count: state.comments.count,
    waiting: state.comments.waiting,
  }), shallowequal);

	const session = useSelector((state) => ({
		exists: state.session.exists
	}))

	const callbacks = {
		openReply: useCallback((_id) => {
      dispatch(commentsActions.openReply(_id));
    }, []),

		closeReply: useCallback(() => {
      dispatch(commentsActions.closeReply());
    }, []),

		addComment: useCallback((text) => {
      const data = {
        text,
        parent: {
					_id: params.id,
					_type: "article",
				},
      };
      dispatch(commentsActions.addComment(data))
				.then(() => dispatch(commentsActions.load(params.id)));
    }, []), 

		addReply: useCallback((text, commentId) => {
      const data = {
        text,
        parent: {
					_id: commentId,
					_type: "comment",
				},
      };

			dispatch(commentsActions.addComment(data))
				.then(() => dispatch(commentsActions.load(params.id)));
    }, []),
	}

	let comments = useMemo(() => {
    return select.comments.length ? 
			[...treeToList(listToTree(select.comments)[0].children, (item, level) => (
				{...item, dateCreate: dateFormat(item.dateCreate), level: level}
			))]: [];
  }, [select.comments]);

  return (
		<Spinner active={select.waiting}>
			<ArticleComments comments={comments}
											 count={select.count}
											 session={session.exists}
											 onOpenReply={callbacks.openReply}
      								 onCloseReply={callbacks.closeReply}
											 onAddComment={callbacks.addComment}
											 onAddReply={callbacks.addReply}/>
		</Spinner>
  );
}

export default memo(Comments);