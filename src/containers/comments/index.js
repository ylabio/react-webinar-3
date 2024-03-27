import {memo, useCallback, useMemo} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import useInit from '../../hooks/use-init';
import Spinner from '../../components/spinner';
import ArticleComments from '../../components/article-comments';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree';
import useTranslate from "../../hooks/use-translate";

function Comments() {
	const dispatch = useDispatch();
	const params = useParams();
	const location = useLocation();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
		count: state.comments.count,
    waiting: state.comments.waiting,
  }), shallowequal);

	const session = useSelector((state) => ({
		exists: state.session.exists,
		user: state.session.user,
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
        text: text.trim(),
        parent: {
					_id: params.id,
					_type: "article",
				},
      };
      if (data.text) dispatch(commentsActions.addComment(data))
    }, []), 

		addReply: useCallback((text, commentId) => {
      const data = {
        text: text.trim(),
        parent: {
					_id: commentId,
					_type: "comment",
				},
      };

			if (data.text) dispatch(commentsActions.addComment(data))
    }, []),
	}

	const {t} = useTranslate();

	let comments = useMemo(() => {
    return listToTree(select.comments)[0]?.children ?? [];
  }, [select.comments]);

  return (
		<Spinner active={select.waiting}>
			<ArticleComments comments={comments}
											 count={select.count}
											 session={session}
											 onOpenReply={callbacks.openReply}
      								 onCloseReply={callbacks.closeReply}
											 onAddComment={callbacks.addComment}
											 onAddReply={callbacks.addReply}
											 t={t}
											 path="/login"
											 location={location.pathname}/>
		</Spinner>
  );
}

export default memo(Comments);