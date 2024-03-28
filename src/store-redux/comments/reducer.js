import listToTree from "../../utils/list-to-tree";
const initialState = {
    comments: [],
    commentTree: [],
    loading: false,
    error: null,
    count: 0,
};
function addReplyToNode(node, parentID, reply) {
    if (node._id === parentID) {
        const updatedNode = {
            ...node,
            replies: node.replies ? [...node.replies, reply] : [reply] 
        };
        return updatedNode;
    } else if (node.replies) {
        const updatedReplies = node.replies.map(childNode => addReplyToNode(childNode, parentID, reply));
        return { ...node, replies: updatedReplies };
    }
    return node;
}
const reducer = (state = initialState, action) => {
    switch (action.type) { 
        case 'FETCH_COMMENTS_START':
        case 'CREATE_COMMENT_START':
        case 'CREATE_REPLY_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_COMMENTS_SUCCESS': {
                const { items, count } = action.payload;
                const filteredComments = items.filter(c => !c.isDeleted);
            const commentTree = listToTree(filteredComments, '_id');
                return {
                    ...state,
                    comments: filteredComments,
                    commentTree,
                    loading: false,
                    count
                };
            }
        case 'CREATE_COMMENT_SUCCESS': {
            const newComment = action.payload;
            const isTopLevelComment = newComment.parent && newComment.parent._type === "article";

            if (isTopLevelComment) {
                return {
                    ...state,
                    comments: [...state.comments, newComment],
                    commentTree: [...state.commentTree, newComment],
                    loading: false
                };
            } else {
                const updatedCommentTree = state.commentTree.map(node => {
                    return addReplyToNode(node, newComment.parent._id, newComment);
                });

                return {
                    ...state,
                    comments: [...state.comments, newComment],
                    commentTree: updatedCommentTree,
                    loading: false
                };
            }
        }
        case 'CREATE_REPLY_SUCCESS': {
            const newReply = action.payload;
            const parentID = newReply.parent && newReply.parent._id;
            const updatedCommentTree = state.commentTree.map(node => {
                return addReplyToNode(node, parentID, newReply);
            });

            return {
                ...state,
                comments: [...state.comments, newReply],
                commentTree: updatedCommentTree,
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