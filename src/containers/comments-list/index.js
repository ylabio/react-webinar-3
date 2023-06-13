import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector as useSelectorRedux } from "react-redux";
import CommentList from "../../components/comment-list";
import useSelector from "../../hooks/use-selector";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import CommentsLayout from "../../components/comments-layout";
import CommentItem from "../../components/comment-item";
import commentsActions from '../../store-redux/comments/actions';
import commentSendActions from '../../store-redux/send-comment/actions';
import CommentAdd from "../../components/comment-add";


function CommentsList() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ active , setActive ] = useState(null)
    const [place, setPlace] = useState(null);

    const select = useSelector(state => ({
        exists: state.session.exists,
        waiting: state.session.waiting,
        username: state.session.user.profile?.name
    }))

    const selectRedux = useSelectorRedux( state => ({
        comments: state.comments.data,
        commentsError: state.comments.error,
        newComment: state.commentSend.data,
        commentsSendWaiting: state.commentSend.waiting,
    }), shallowEqual)

    const callbacks = {
        addComment: useCallback((text, id , type) => dispatch(commentSendActions.sendComment(text, id, type)),[]),
        onAnswer: useCallback((id) => {
            setActive(id)
          }, []),
      
          onCancel: useCallback(() => {
            setActive(null)
          }, []),
    }

    useInit(() => {
        dispatch(commentsActions.loadComments(id))
        setPlace(findPlaceForForm());
        setTimeout(scroll, 0)
      }, [select.exists, selectRedux.newComment, active]);

    const comments = useMemo(() => 
    treeToList(listToTree(selectRedux.comments), (item, level, children) => (
        {
            id: item._id,
            level,
            children,
            text: item.text,
            author: item.author.profile.name,
            date: item.dateCreate
        }
    )), [selectRedux.comments])


    const renders = {
        item: useCallback( comment => (
            <CommentItem
                comment={comment}
                exists={select.exists}
                username={select.username}
                active={active}
                level={comment.level}
                onAnswer={callbacks.onAnswer}
                onCancel={callbacks.onCancel}
                addComment={callbacks.addComment}
                lastIndex={lastIndex}
                place={place}
                setPlace={setPlace}
                findLastChildrenId={findLastChildrenId}
                setActive={setActive}
                formRef={formRef}
            />
        ), [comments, active])
    }

    const lastIndex = selectRedux.comments.findLastIndex(comment => comment.parent._id === active);
    // const lastChild = lastIndex === -1 ? active : selectRedux.comments[lastIndex]?._id;

    const findPlaceForForm = () => {
        if (active !== null) {
          const replyTo = selectRedux.comments.find((item) => item._id === active.id);
          const placeId = findLastChildrenId(replyTo);
          return placeId;
        }
      };

    function findLastChildrenId(comment) {
        if (comment) {
          return comment.children.length
            ? findLastChildrenId(comment.children[comment.children.length - 1])
            : comment._id;
        }
        return null;
      }

      const formRef = useRef(null);
      const scroll = () => {
        if (!formRef.current) return;
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };    

    return (
        <Spinner active={select.waiting}>
            <CommentsLayout length={comments.length}>
                <CommentList commentsList={comments} toRender={renders.item}/>
                {
                    active === null
                    ?
                    <CommentAdd 
                    isAuth={select.exists}
                    addComment={callbacks.addComment}
                    />
                    :
                    <></>
                }
            </CommentsLayout>
        </Spinner>
    )
}

export default memo(CommentsList);