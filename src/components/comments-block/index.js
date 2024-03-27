import {memo, useRef} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link, useParams} from "react-router-dom";
import formatDate from "../../utils/format-data";
import CommentForm from "../comment-form";
import {useDispatch} from 'react-redux';
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";
import useTranslate from "../../hooks/use-translate";
import LoginMessage from "../login-message";


function CommentsBlock(props) {
  const commentListRef = useRef(null);
  const commentFormRef = useRef(null);
  console.log(props.loggedUser)
  const scrollToLastComment = () => {
    if (commentFormRef.current) {
      commentFormRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  const dispatch = useDispatch();

  const params = useParams();

  useInit(() => {
    props.setShowFormId(null)
    dispatch(commentsActions.loadComments(params.id)).then(scrollToLastComment);
  }, [dispatch, params.id, props.loggedUser]);


  const cn = bem('CommentsBlock');

  const {t} = useTranslate();


  return (
    <div ref={commentListRef} className={cn()}>
      <h4>Комментарии ({props.comments.length})</h4>
      {props.comments.map(comm => {
          return (
            <div key={comm._id} className={cn('layout')}
                 style={{paddingLeft: `${(comm.level - 1) * 30}px`}}>
              <div className={cn('nameDate')}>
                <span
                  className={props.loggedUser._id !== comm.author._id ? cn('name') : ''}>{comm.author?.profile?.name ? comm.author?.profile?.name : props.loggedUser?.profile?.name }</span>
                <span>{formatDate(comm.dateCreate)}</span>
              </div>
              <div className={cn('text')}>{comm.text}</div>
              <Link onClick={() => props.setShowFormId(comm._id)} className={cn('button')}>Ответить</Link>
              {props.showFormId === comm._id && props.loggedUser._id &&
                <CommentForm setShowFormId={props.setShowFormId} showFormId={comm._id} title={'Новый ответ'}
                             callback={(text) => props.onAnswer(text, comm._id)}/>}
              {!props.loggedUser._id && props.showFormId === comm._id &&
                <LoginMessage link={props.link} callback={() => props.setShowFormId(null)} id={comm._id}
                              text={' чтобы иметь возможность ответить. '}/>}
            </div>
          )
        }
      )}
      {!props.loggedUser._id && !props.showFormId &&
        <LoginMessage link={props.link} text={' чтобы иметь возможность комментировать.'}/>}
      {props.loggedUser._id && !props.showFormId &&
        <CommentForm ref={commentFormRef} title={'Новый комментарий'} callback={props.onComment}/>}
    </div>
  );
}


export default memo(CommentsBlock);

