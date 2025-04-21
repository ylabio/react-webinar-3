import { memo, useMemo, useCallback } from 'react';
import Spinner from '../../components/spinner';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import CommentsList from '../../components/comments-list';
import useSelector from '../../hooks/use-selector';
import listToTree from '../../utils/list-to-tree';
import commentsArticle from '../../store-redux/article-comments/actions';
import useTranslate from '../../hooks/use-translate';

function ArticleComments() {
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
  }));
  const selectSession = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
    user: state.session.user,
  }));

  const options = {
    comments: useMemo(() => {
      if (select.comments.items !== undefined) {
        return listToTree(select.comments.items || []);
      }
    }, [select.comments]),
  };

  const callbacks = {
    onSubmit: useCallback((e, id, type) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const text = formData.get('text');
      if (text.trim() === '') {
        return;
      }
      dispatch(commentsArticle.post(id, type, text));
    }, []),
  };
  return (
    <>
      <Spinner active={select.waiting}>
        <CommentsList
          t={t}
          onSubmit={callbacks.onSubmit}
          isExist={selectSession.exists}
          comments={options.comments}
          currentUser={selectSession.user}
          commentsLength={select.comments.items?.length}
        />
      </Spinner>
    </>
  );
}

export default memo(ArticleComments);
