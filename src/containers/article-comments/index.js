import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import listToTree from '../../utils/list-to-tree';
import articleCommentsForm from '../../store-redux/comments/form/actions';
import {useParams} from 'react-router-dom';
import articleComments from '../../store-redux/comments/actions';
import HeadComments from '../../components/head-comments';
import LinkSignIn from '../../components/link-sign-in';
import ContentLayout from '../../components/content-layout';
import ItemComments from '../../components/item-comments';
import List from '../../components/list';
import CommentForm from '../../components/comment-form';


function ArticleComments () {

  const params = useParams();

  const {t} = useTranslate();

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    userId: state.session.user._id,
    exists: state.session.exists
  }));

  const selectRedux = useSelectorRedux(state => ({
    listСomments: useMemo(() => (
      listToTree(state.comments.list)
    ), [state.comments.list]),
    count: state.comments.count,
    idComment: state.commentsForm.idComment,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    // Открытие формы для создания нового комментария
    openForm: useCallback(id => dispatch(articleCommentsForm.openForm(id)), []),

    // Закрытие формы для отмены создания нового комментария
    closeForm: useCallback(() => dispatch(articleCommentsForm.closeForm()), []),

    //Отправка данных формы по API для создания нового комментария
    onSubmit: useCallback(async(text) => {
      await dispatch(articleCommentsForm.onSubmit(params.id, text));
      //Загрузка коменнтариев
      dispatch(articleComments.pushComment());
    }, []),
  }

  const renders = {
    itemComments: useCallback(item => (
      <>
        <ItemComments 
          reply={t('comments.reply')} item={item} userId={select.userId} exists={select.exists}  idComment={selectRedux.idComment} 
          openForm={callbacks.openForm} signIn={t('comments.signIn')} punctuation={'.'}
          textSignIn={t('comments.ableReply')} link={'/login'} closeForm={callbacks.closeForm} onSubmit={callbacks.onSubmit} 
          label={t('commentForm.newReply')} showNow={true} btnSend={t('comments.send')} btnCancel={t('comments.cancel')}
          placeholder={t('commentForm.placeholderReply') +  item.author?.profile?.name}
        />
        {item.children.length > 0 && <List theme={'comments-left'} list={item.children} renderItem={renders.itemComments}/>}
      </>
    ), [t, selectRedux.idComment]),
  };

  return (
    <ContentLayout padding='medium' visibility='scroll'>
      <HeadComments title={t('comments.title')} count={selectRedux.count}/>
      {selectRedux.listСomments[0]?.children && <List theme={'comments'} list={selectRedux.listСomments[0].children} renderItem={renders.itemComments}/>}
      {select.exists 
        ? !selectRedux.idComment 
            && <CommentForm 
              closeForm={callbacks.closeForm} onSubmit={callbacks.onSubmit} label={t('commentForm.newComment')} 
              btnSend={t('comments.send')} btnCancel={t('comments.cancel')} placeholder={t('commentForm.placeholderText')}
            /> 
        : !selectRedux.idComment && <LinkSignIn signIn={t('comments.signIn')} textSignIn={t('comments.ableComment')} link={'/login'}/>}
    </ContentLayout>
  );

}

export default memo(ArticleComments);