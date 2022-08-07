import axios from 'axios'

export const Addproductcart = (productid, quantity) => async (dispatch, getState) => {
    try {
        console.log('cartaction')
        const {data} = await axios(`http://localhost:5000/api/products/${productid}`)
        console.log(data)
        dispatch({
            type: 'add_product_cart',
            payload: {
                product: data._id,
                quantity: Number(quantity),
                name: data.name,
                description: data.description,
                image: data.image,
                category: data.category,
                price: data.price,
                countInStock: data.countInStock
            }
        })
        console.log(getState().Cart.cart)
        localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cart))
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'cart_error'
        })
    }
}

export const deleteproductcart = (productid) => (dispatch, getState) => {
    try {
        const cart = getState().Cart.cart
        const cartafterdelete = cart.filter(item => item.product !== productid)
        dispatch({
            type: 'delete_product_cart',
            payload: productid
        })
        localStorage.setItem('cartItems', JSON.stringify(cartafterdelete))
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'cart_error'
        })
    }
}
export const logoutcart = () => (dispatch) => {
    dispatch({
        type: 'cart_logout'
    })
}