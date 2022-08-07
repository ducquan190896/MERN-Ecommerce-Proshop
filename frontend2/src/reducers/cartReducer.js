const initialState = {
    cart: [],
    cartSuccess: false,
    cartError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'add_product_cart': 
        console.log('add to cart')
            const item = action.payload
            // if(state.cart.length >= 1 ) {
                const existingitem =  state.cart.find(itemcart => itemcart.product ===  item.product)
            if(existingitem) {
                return {
                    ...state, 
                    cartSuccess: true,
                    cart: state.cart.map(itemcart => itemcart.product == item.product ? item : itemcart)
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, item],
                    cartSuccess: true
                }
            }
        case 'delete_product_cart': 
            return {
                ...state,
                cart: state.cart.filter(itemcart => itemcart.product !== action.payload)
            }
            
        case 'cart_error' : 
            return {
                ...state,
                cartError: true, 
                cartSuccess: false
            }
        case 'cart_reset':
            return {
                ...state,
                cartError: false,
                cartSuccess: false
            }
        case 'cart_logout':
             return {
                ...state,
                cartSuccess: true,
                cart: []
             }
        default: 
        return state
    }

}