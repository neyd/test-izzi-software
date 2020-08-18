const initialState = {
    authUser: null,
    authUserData: [],
    users: [],
    news: [],
};


function rootReducer(state = initialState, action) {
    switch(action.type){
        case "SET_AUTH_USER":
            return {
                ...state,
                authUser: action.user,
                authUserData: state.users.find(us => us.id === parseInt(action.user))
            }
        case "SET_IMPORTED_USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET_IMPORTED_NEWS":
            return {
                ...state,
                news: action.news
            }
        case "ADD_NEW_POST":
            console.log(action.post)
            return {
                ...state,
                news: [...state.news, action.post]
            }
        case "EDIT_POST":
            return {
                ...state,
                news: [...state.news.filter(n=> n.id!=action.post.id), action.post]
            }
        case "REMOVE_POST":
            return {
                ...state,
                news: [...state.news.filter(n=> n.id!=action.post)]
            }
        default: return state;
    }
}

export default rootReducer;