const initialState = {
    orders: [],
    order: null,
    orderSuccess: false,
    orderError: false,
 
    paidSuccess: false,
    paidError: false,
    orderMessage: null
}


const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'create_order':
            return {
                ...state,
                order: action.payload,
                orderSuccess: true
            }
        case 'get_single_order':
                return {
                    ...state,
                    order: action.payload,
                    orderSuccess: true
                }
        case 'update_order':
                    return {
                        ...state,
                        order: action.payload,
                        orderSuccess: true
                    }
        case 'get_my_order':
            return {
                        ...state,
                        orders: action.payload,
                        orderSuccess: true
                    }
        case 'get_all_orders_admin':
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true
            }
        case 'get_single_order_admin':
            return {
                ...state,
                order: action.payload,
                orderSuccess: true
            }
        case  'update_order_delivered':
            return {
                ...state,
                order: action.payload,
                orders: state.orders.map(item => item._id.toString() === action.payload._id.toString() ? action.payload : item),
                orderSuccess: true
            }
        case 'error_order':
            return {
                ...state,
                orderError: false,
                orderMessage: action.payload
            }
        case 'reset_order':
            return {
                ...state,
                orderError: false,
                orderSuccess: false,
                
                paidSuccess: false,
                paidError: false,
            }
        case 'success_paid':
            return {
                ...state,
                paidSuccess: true
            }
        case 'error_paid':
            return {
                ...state,
                paidError: true
            }
        case 'reset_paid':
            return {
                ...state,
                paidSuccess: false,
                 paidError: false
            }
        case 'reset_order_paid':
            return {
                ...state,
                order: null,
                orderSuccess: false,
                orderError: false,
                paidSuccess: false,
                paidError: false,
                orders: []

            }
        // case 'order_logout':
        //         return {
        //             ...state,
        //             order: null,
        //             orderSuccess: false,
        //             orderError: false,
        //             paidSuccess: false,
        //             paidError: false,
        //             orders: []
    
        //         }
        default:
            return state
    }
}

export default orderReducer