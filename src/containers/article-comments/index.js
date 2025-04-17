import { memo, useMemo, useCallback } from 'react';
import Spinner from '../../components/spinner';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import CommentsList from '../../components/comments-list';
import useSelector from '../../hooks/use-selector';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import commentsArticle from '../../store-redux/article-comments/actions';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';

function ArticleComments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
  }));
  const selectSession = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const options = {
    comments: useMemo(() => {
      if (select.comments.items !== undefined) {
        return [
          ...treeToList(listToTree(select.comments.items), (item, level) => ({
            value: item._id,
            level: level * 40,
            text: item.text,
            date: item.dateCreate,
            author: item.author._type,
            parent: item.parent._type,
          })),
        ];
      }
    }, [select.comments]),
  };

  const callbacks = {
    onSubmit: useCallback((e, id, type) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const text = formData.get('text');
      dispatch(commentsArticle.post(id, type, text));
      navigate(0);
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
        />
      </Spinner>
    </>
  );
}

export default memo(ArticleComments);
