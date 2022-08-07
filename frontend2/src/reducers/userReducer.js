const initialState = {
    user: null,
    userSuccess: false,
    userError: false,
    userMessage: null,
    userUpdate: false
}


 const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user_login': 
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case 'user_register':
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case 'user_error': 
            return {
                ...state,
                userMessage: action.payload,
                userSuccess: false,
                userError: true,
                userUpdate: false
            }
        case 'user_reset':
            return {
                ...state,
                userSuccess: false,
                userError: false,
                userUpdate: false,
                userMessage: null
            }
        case 'user_update': 
            return {
                ...state,
                user: action.payload,
                userUpdate: true,
                userSuccess: true,
               
            }
        case 'user_logout':
            return {
                ...state,
                userSuccess: false,
                userError: false,
                userUpdate: false,
                userMessage: null,
                user: null
            }
        default: 
        return state
    }
}

export default userReducer