const initialState = {
    data: [],
    waiting: false,
    error: null,
}

function reducer (state = initialState, action) {
    switch(action.type) {
        //Загрузка комментариев
        case 'comments/load-start':
            return {...state, waiting: true, error: null};
        case 'comments/load-success':
            return {...state, data: action.payload.data , waiting: false, error: null};
        case 'comments/load-error':
            return {...state, data: null, waiting: false, error: action.payload}

        default: 
            return state;

    }
}

export default reducer;