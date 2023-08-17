const initialState = {
    users: [],
    products: [],
    activeUser: null,
    showForm: false,
    currentUser: {
        user: null,
        isLoggedIn: false,
        error: null,
        answer: null
    },
    submissions: {}
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return {
                ...state,
                users: action.payload
            };
        case 'GET_ALL_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'UPDATE_USER':
            const newUsers = [...state.users];
            const updateIndex = newUsers.findIndex(user => user.id === action.payload.id);
            newUsers[updateIndex] = { ...newUsers[updateIndex], ...action.payload };
            console.log(newUsers);
            return {
                ...state,
                users: newUsers
            }
        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload.id)
            }
        case 'SHOW_FORM':
            return {
                ...state,
                showForm: action.payload
            }
        case 'SET_ACTIVE_USER':
            return {
                ...state,
                activeUser: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                currentUser: { ...action.payload }
            }
        case 'LOGOUT':
            return {
                ...state,
                currentUser: { ...action.payload }
            }
        // case 'SUBMIT':
        //     return {
        //         ...state,
        //         currentUser: { ...state.currentUser, answer: action.payload }
        //     }
        case 'EDIT_ANSWER':
            const user = { ...state.currentUser.user, answer: action.payload };
            return {
                ...state,
                currentUser: { ...state.currentUser, user: user }
            }
        case 'GET_SUBMISSIONS': {
            return {
                ...state,
                submissions: action.payload
            }
        }
        default:
            return state
    }
}