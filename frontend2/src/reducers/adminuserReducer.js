const initialState = {
    userlist: [],
    Aduser: null,
    AduserSuccess: false,
    AduserError: false,
    AduserMessage: null,
}


const adminuserReducer = (state = initialState, action ) => {
    switch (action.type) {
        case 'admin_user_list':
            return {
                ...state,
                AduserSuccess: true,
                userlist: action.payload
            }
        case 'admin_user_single':
            return {
                ...state,
                Aduser: action.payload,
                AduserSuccess: true
            }
        case 'admin_user_delete':
            return {
                ...state,
                AduserSuccess: true,
                userlist: state.userlist.filter(item => item._id.toString() !== action.payload.toString()),
                AduserMessage: `user ID ${action.payload} deleted`
            }
        case 'admin_user_update':
            return {
                    ...state,
                    AduserSuccess: true,
                    userlist: state.userlist.map(item => item._id.toString() === action.payload._id.toString() ? action.payload : item ),
                    Aduser: action.payload,
                    AduserMessage: `user ID ${action.payload} edited`
                }
        case 'admin_user_error':
            return {
                ...state,
                AduserError: true,
                AduserMessage: action.payload
            }
        case 'admin_user_reset':
            return {
                ...state,
                AduserError: false,
                AduserSuccess: false,
            }
        case 'admin_user_logout':
            return {
                ...state,
                userlist: [],
                Aduser: null,
                AduserSuccess: false,
                AduserError: false,
                AduserMessage: null,
            }
        default:
            return state
    }
}
export default adminuserReducer