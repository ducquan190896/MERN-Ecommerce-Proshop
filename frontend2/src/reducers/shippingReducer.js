const initialState = {
    shippingaddress: {},
    shippingError: false,
    shippingSuccess: false,
    payment: null,
    paymentSuccess: false,
    paymentError: false
}

const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'get_shippingaddress': 
            return {
                ...state,
                shippingaddress: action.payload,
                shippingSuccess: true
            }
        case 'reset_shippingaddress': 
            return {
                ...state,
                shippingaddress: {},
                shippingError: false,
                shippingSuccess: false
            }
        case 'error_shippingaddress':
            return {
                ...state,
                shippingError: true
            }
        case 'get_payment':
            return {
                ...state,
                payment: action.payload,
                paymentSuccess: true

            }
        case 'error_payment': 
            return {
                ...state,
                paymentError: true
            }
        case 'reset_payment':
            return {
                ...state,
                payment: null,
                paymentError: false,
                paymentSuccess: false
            }
        default: 
            return state
    }
}

export default shippingReducer