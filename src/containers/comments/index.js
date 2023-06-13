import {memo, useCallback, useMemo, useState, useRef, useEffect} from 'react';
import {useParams} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import commentsActions from "../../store-redux/comments/actions";
import CommentsCard from '../../components/comments-card';
import NewComment from '../../components/comments-card/newComment';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import Comment from "../../components/comments-card/comment";
import EnterToComment from "../../components/comments-card/enterToComment";

function Comments() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [selectedReplyId, setSelectedReplyId] = useState("");

    const selectStore = useSelector(state => ({
        exists: state.session.exists,
        user: state.session.user
    }));
    const selectRedux = useSelectorRedux(state => ({
        data: state.comments.data,
        count: state.comments.count,
        id: state.comments.id
    }));

    useInit(() => {
        dispatch(commentsActions.load(id))
    }, [id])

    const comments = useMemo(() => {
        if(selectRedux.data) {
        const data = selectRedux.data.map(item => {
            if(item.parent._type === 'article') {
                return {...item, parent: null}
            }
            return item;
        })
        const tree = listToTree(data);
        return treeToList(tree, (item, level) => ({
            _id: item._id,
            level,
            dateCreate: item.dateCreate,
            authorName: item.author.profile.name,
            text: item.text
        }));
    }
        return null;
    }, [selectRedux.data])
    const callbacks = {
        postComment: useCallback((text, parentId, type) => {
            dispatch(commentsActions.postComment(text, parentId, type, (parentId) => dispatch(commentsActions.load(parentId))));
        }),
        postAnswer: useCallback((text, parentId, type) => {
            dispatch(commentsActions.postComment(text, parentId, type, () => dispatch(commentsActions.load(id))));
        })
    }

    const renders = {
        item: useCallback(item => (
          <Comment 
            comment={item}
            exists={selectStore.exists}
            level={item.level}
            postAnswer={callbacks.postAnswer}
            reply={item._id === selectedReplyId}
            setSelectedReplyId={setSelectedReplyId}
            id={selectRedux.id}
          />
        ), [comments, selectedReplyId]),
      };

    return (
        <>
          <CommentsCard data={comments} renderItem={renders.item} count={selectRedux.count}/>
        {selectStore.exists ?
            <NewComment postComment={callbacks.postComment}/> 
            :  
            <EnterToComment/>
            }
        </>
    )
}

export default memo(Comments);