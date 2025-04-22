import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import Comment from '../../components/comment';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import commentsFormat from '../../utils/comments-format';
import shallowequal from 'shallowequal';
import CommentInput from '../../components/comment-input';
import Form from '../../components/form';
import CommentsLayout from '../../components/comments-layout';
import commentsActions from '../../store-redux/comments/actions';
import InputWrapper from '../input-wrapper';
import useSelector from '../../hooks/use-selector';
import CommentWithForm from '../comment-with-form';

function CommentList() {

  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const select = useSelectorRedux(
    state => ({
      comments: state.comments.items,
      count: state.comments.count,
      waitingComments: state.comments.waiting,
      article: state.article,
      activeCommentId: state.comments.activeCommentId,
    }),
    shallowequal,
  );

  useEffect(() => {
    dispatch(commentsActions.resetActiveComment());
  }, []);
  

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((newText) => {
      setText(newText);
    }, []),

    // Отправка формы для создания комментария
    onSubmit: useCallback(
      (e, id, type) => {
        e.preventDefault();
        if(text.trim().length !== 0) {
          dispatch(commentsActions.sendComment(text.trim(), id, type));
          setText('');
        }
      },
      [text],
    ),
  };


  const commentList = useMemo(() => {
    return commentsFormat(select.article.data._id, select.comments);
  }, [select.article, select.comments]);


  const { t } = useTranslate();

  return (
    <>
    <CommentsLayout>
      <h2>{t('comments.title')} ({select.count})</h2>
      <Spinner active={select.waitingComments}>
        {commentList.map((item) => {
          return (
              <CommentWithForm
                item={item}
                level={0}
                key={item._id}
              />
          )
        })}
      </Spinner>
    </CommentsLayout>
      {!select.activeCommentId &&
        <InputWrapper>
          <Form
            title={t('comments.newComment')}
            submitTitle={t('comments.submit')}
            onSubmit={(e) => callbacks.onSubmit(e, select.article.data._id)}
            titleType='small'
          >
            <CommentInput onChange={callbacks.onChange} value={text}/>
          </Form>
        </InputWrapper>
      }
    </>
  );
}

export default memo(CommentList);
