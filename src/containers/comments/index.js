import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import checkParentType from '../../utils/check-parent-type';
import Comment from '../comment';
import SectionLayout from '../../components/section-layout';
import { useState } from 'react';
import ShowForm from '../show-form';
import { useParams } from 'react-router-dom';
import commentsActions from '../../services/store-redux/comments/actions';
import useTranslate from '../../hooks/use-translate';

function Comments() {
  const dispatch = useDispatch();
  const [addForm, setAddForm] = useState('article');
  const [newComment, setNewComment] = useState('');
  const select = useSelectorRedux((state) => ({
    comments: state.comments.data?.items ?? [],
    error: state.comments.error,
  }));
  const params = useParams();
  const { t } = useTranslate();

  const data = {
    commentsTree: listToTree(select.comments, '_id', (item) =>
      checkParentType(item, '_type', 'comment')
    ),
    commentsCount: select.comments.reduce(
      (acc, comment) => acc + (comment.isDeleted ? 0 : 1),
      0
    ),
  };

  const callbacks = {
    onAnswer: (id) => {
      setAddForm(id);
    },
    onSubmit: () => {
      const isArticleChild = addForm === 'article';
      if (newComment.trim().length === 0) {
        setNewComment('');
        dispatch({
          type: 'comments/post-error',
          payload: { error: { message: t('comment.error.empty') } },
        });
        console.log(select.error);
        return;
      }
      const parent = {
        _id: isArticleChild ? params.id : addForm,
        _type: isArticleChild ? 'article' : 'comment',
      };
      const data = {
        text: newComment.trim(),
        parent,
      };
      dispatch(commentsActions.post(data));
    },
    onReset: () => {
      setAddForm('article');
      setNewComment('');
    },
    onChange: (evt) => {
      if (select.error) {
        dispatch({ type: 'comments/reset-error' });
      }
      setNewComment(evt.target.value);
    },
    showAnswer: (id) => id === addForm,
  };

  const render = {
    cancelButton: (cn) => (
      <button type={'reset'} onClick={callbacks.onReset} className={cn}>
        {t('comment.button.cancel')}
      </button>
    ),
    comments: (list, level = 0) => {
      return list.map((comment) => {
        return (
          <Comment
            comment={comment}
            showAnswer={callbacks.showAnswer}
            onAnswer={callbacks.onAnswer}
            onReset={callbacks.onReset}
            onChange={callbacks.onChange}
            onSubmit={callbacks.onSubmit}
            newComment={newComment}
            renderCancelButton={render.cancelButton}
            renderChildren={render.comments}
            key={comment._id}
            level={level + 1}
            shouldFocus={callbacks.shouldFocus}
            error={select.error?.message}
          />
        );
      });
    },
  };

  return (
    <>
      <SectionLayout
        padding={'large'}
        title={`${t('comments')} (${data.commentsCount})`}
      >
        {render.comments(data.commentsTree)}

        <ShowForm
          showForm={addForm === 'article'}
          text={t('comment.login.text')}
          title={t('comment.new')}
          onChange={callbacks.onChange}
          onSubmit={callbacks.onSubmit}
          newComment={newComment}
          shouldFocus={false}
          error={select.error?.message}
        />
      </SectionLayout>
    </>
  );
}

export default Comments;
