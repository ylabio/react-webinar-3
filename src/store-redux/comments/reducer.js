import buildCommentTree from "../../utils/build-comment-tree";
const initialState = {
    comments: [],
    commentTree: [],
    loading: false,
    error: null,
    count: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) { // удалил дублирующий код, поправил имутабельность
        case 'FETCH_COMMENTS_START':
        case 'CREATE_COMMENT_START':
        case 'CREATE_REPLY_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_COMMENTS_SUCCESS': {
            const { items, count } = action.payload;
            const filteredComments = items.filter(c => !c.isDeleted);
            const commentTree = buildCommentTree(filteredComments);
            return {
                ...state,
                comments: filteredComments,
                commentTree,
                loading: false,
                count
            };
        }
        case 'CREATE_COMMENT_SUCCESS':
        case 'CREATE_REPLY_SUCCESS': {
            const newCommentOrReply = action.payload;
            const comments = [newCommentOrReply, ...state.comments];
            const commentTree = buildCommentTree(comments);
            return {
                ...state,
                comments,
                commentTree,
                loading: false
            };
        }
        case 'FETCH_COMMENTS_FAILURE':
        case 'CREATE_COMMENT_FAILURE':
        case 'CREATE_REPLY_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default reducer;