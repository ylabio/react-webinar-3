const initialState = {
	comments: [],
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'comments/get-all':
			return {...state, comments: action.payload.comments.items};
		default:
			return state;
	}
}

export default reducer