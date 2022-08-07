import axios from "axios"

export const CreateOrder = (formdata) => async (dispatch, getState) => {
    try {   
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    
        console.log(token, formdata)
        // const inputdata = {message: 'test api'}
        const {data} = await axios.post('http://localhost:5000/api/order', formdata, config)

        console.log(data)
        dispatch({
            type: 'create_order',
            payload: data
        })
        localStorage.setItem('order', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: 'error_order',
            payload: err.message
        })
    }
}

export const Resetorder = () => (dispatch) => {
    dispatch({
        type: 'reset_order'
    })
}

export const Logoutorder = () => (dispatch) => {
    dispatch({
        type: 'reset_order_paid'
    })
    localStorage.removeItem('order')
}

export const GetorderbyID = (orderid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }
        const {data} = await axios.get(`http://localhost:5000/api/order/${orderid}`, config)
        dispatch({
            type: 'get_single_order',
            payload: data
        })
        localStorage.setItem('order', JSON.stringify(data))
     } catch (err) {
        dispatch({
            type: 'error_order',
            payload: err.message
        })
     }
}
export const Getmyorders = () => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }
        const {data} = await axios.get('http://localhost:5000/api/order/myorder', config)
        dispatch({
            type: 'get_my_order',
            payload: data
        })
        
     } catch (err) {
        dispatch({
            type: 'error_order',
            payload: err.message
        })
     }
}
export const updateorder = (orderid, paymentResult) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        }
        const {data} = await axios.put(`http://localhost:5000/api/order/${orderid}`, paymentResult, config)
        dispatch({
            type: 'update_order',
            payload: data
        })
        dispatch({
            type: 'success_paid'
        })
        localStorage.setItem('order', JSON.stringify(data))
     } catch (err) {
        dispatch({
            type: 'error_order',
            payload: err.message
        })
        dispatch({
            type: 'error_paid'
        })
     }
}

export const ResetPaid = () => (dispatch) => {
    dispatch({
        type: 'reset_paid'
    })
}

export const getAllOrders = () => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }
        const {data} = await axios.get('http://localhost:5000/api/order/allorders', config)
        dispatch({
            type: 'get_all_orders_admin',
            payload: data
        })
        
     } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'error_order',
            payload: err.message
        })
     }
}

export const getsingleorderAdmin = (orderid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }
        const {data} = await axios.get(`http://localhost:5000/api/order/${orderid}/orderByAdmin`, config)
        console.log(data)
        dispatch({
            type: 'get_single_order_admin',
            payload: data
        })
        localStorage.setItem('order', JSON.stringify(data))
     } catch (err) {
        dispatch({
            type: 'error_order',
            payload: err.message
        })
     }
}

export const updateorderdelivered = (orderid) => async (dispatch, getState) => {
    try {
        
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
        }
        console.log(orderid, token)
        const {data} = await axios.put(`http://localhost:5000/api/order/${orderid}/delivered`,{},  config)
        dispatch({
            type: 'update_order_delivered',
            payload: data
        })
     } catch (err) {
        dispatch({
            type: 'error_order',
            payload: err.message
        })
     }
}
