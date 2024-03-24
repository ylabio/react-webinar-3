import buildCommentTree from "../../utils/build-comment-tree";
const initialState = {
    comments: [],
    commentTree: [],
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {//решил их разделить , хотя они сейчас одинаковые, на случай если понадобится разная обработка
    switch (action.type) {
        case 'FETCH_COMMENTS_START':
        case 'CREATE_COMMENT_START':
            console.log('Rendering commentTree:1', state.commentTree);
            return { ...state, loading: true, error: null };
        case 'CREATE_REPLY_START':
            console.log('Rendering commentTree:1', state.commentTree);
            return { ...state, loading: true, error: null };
        case 'FETCH_COMMENTS_SUCCESS': {
            const filteredComments = action.payload.filter(c => !c.isDeleted);
            const commentTree = buildCommentTree(filteredComments);
            return { ...state, comments: filteredComments, commentTree, loading: false };
        }
        case 'CREATE_COMMENT_SUCCESS': {
            const newReply = action.payload;
            const comments = [newReply, ...state.comments];
            const commentTree = buildCommentTree(comments);
            return { ...state, comments, commentTree, loading: false };
        }
        case 'CREATE_REPLY_SUCCESS': {
            const newReply = action.payload;
            const comments = [newReply, ...state.comments];
            const commentTree = buildCommentTree(comments);
            console.log('cooments',[comments, commentTree]);
            return { ...state, comments, commentTree, loading: false };
        }
        case 'FETCH_COMMENTS_FAILURE':
        case 'CREATE_COMMENT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_REPLY_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default reducer;