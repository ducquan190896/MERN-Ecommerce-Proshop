const initialState = {
    products: [],
    product: null,
    productSuccess: false,
    productError: false,
    productLoading: false,
    message: null,
    adminProduct: null,
    adminProSuccess: false,
    adminProError: false,
    reviewSuccess: false,
    reviewError: false,
    page: null,
    pages: null
}

 const cartReducer =  (state = initialState, action) => {
    switch (action.type) {
        case 'get_products': 
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                productSuccess: true,
                productLoading: false
            }
        case 'get_product':
            return {
                ...state,
                product: action.payload,
                productSuccess: true,
                productLoading: false
            }
            case 'get_product_admin':
                return {
                    ...state,
                    adminProduct: action.payload,
                    product: action.payload,
                    adminProSuccess: true
                }
        case 'create_product_admin':
            return {
                ...state,
                adminProSuccess: true,
                products: [...state.products, action.payload],
                adminProduct: action.payload,
                product: action.payload

            }
        case 'delete_product_admin':
                return {
                    ...state,
                    adminProSuccess: true,
                    products: state.products.filter(item => item._id !== action.payload),
                    product: null,
                    adminProduct: null
    
                }
        case 'update_product_admin':
                return {
                        ...state,
                        adminProSuccess: true,
                        products: state.products.map(item => item._id === action.payload._id ? action.payload : item),
                        adminProduct: action.payload,
                        product: action.payload
        
                    }
        
        case 'product_error':
            return {
                ...state,
                productLoading: false,
                productError: true,
                productSuccess: false,
                message: action.payload
            }
        case 'product_error_admin':
            return {
                ...state,
                productLoading: false,
                adminProError: true,
                adminProSuccess: false,
                message: action.payload
            }
        case 'product_logout_admin': {
            return {
                ...state,
                adminProduct: null,
                adminProSuccess: false,
                adminProError: false
            }
        }
        case 'reset_product':
            return {
                ...state,
                productLoading: false,
                productError: false,
                productSuccess: false,
                adminProSuccess: false,
                adminProError: false, 
                message: null,
                reviewError: false,
                reviewSuccess: false
            }
            case 'reset_product_admin':
                return {
                    ...state,
                    productLoading: false,
                    productError: false,
                    productSuccess: false,
                    adminProSuccess: false,
                    adminProError: false, 
                    message: null,
                    adminProduct: null,
                    product: null,
                    reviewError: false,
                    reviewSuccess: false
                }
        case 'loading_product':
            return {
                ...state,
                productLoading: true,
                productError: false,
                productSuccess: false

            }
        case 'add_review': 
            return {
                ...state,
                reviewSuccess: true,
                products: state.products.map(item => item._id === action.payload._id ? action.payload : item),
                product: action.payload
            }
        case 'error_review':
            return {
                ...state,
                reviewError: true
            }
        default:
        return state
    }
}

export default cartReducer