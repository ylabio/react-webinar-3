import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

const initialState = {
    comments: [],
    waiting: false,
    sendCommentStatus: null,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'comments/load-start':
            return { ...state, comments: [], waiting: true };

        case 'comments/load-success':
            const commentsTree = listToTree(action.payload.comments.items);

            return { ...state, comments: commentsTree[0].children, waiting: false };

        case 'comments/load-error':
            return { ...state, comments: [], waiting: false };

        case 'sendArticleComment/load-start':
            return { ...state, waiting: true };

        case 'sendArticleComment/load-success':
            return { ...state, sendCommentStatus: action.payload, waiting: false, };

        case 'sendArticleComment/load-error':
            return { ...state, waiting: false, sendCommentStatus: action.payload };

        case 'sendReplyComment/load-start':
            return { ...state, waiting: true };

        case 'sendReplyComment/load-success':
            return { ...state, sendCommentStatus: action.payload, waiting: false, };

        case 'sendReplyComment/load-error':
            return { ...state, waiting: false, sendCommentStatus: action.payload };

        default:
            return state;
    }
}

export default reducer;
