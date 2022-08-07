import axios from "axios";

export const Signin = (formdata) => async (dispatch) => {
    try {
        
        console.log('signin')
        const {data} = await axios.post('/api/user/signin', formdata)
        console.log(data)
        dispatch({
            type: 'user_login',
            payload: data
        })
        localStorage.setItem('userinfor', JSON.stringify(data))
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'user_error',
            payload: err.message
        })
    }
}
export const userReset = () => (dispatch) => {
    dispatch({
        type: 'user_reset'
    })
}
export const userLogout = () => (dispatch) => {
    dispatch({
        type: 'user_logout'
    })
    localStorage.removeItem('userinfor')
    localStorage.removeItem('cartItems')
}
export const Register = (formdata) => async (dispatch) => {
    try {
        
        console.log('register')
        const {data} = await axios.post('/api/user/register', formdata)
        console.log(data)
        dispatch({
            type: 'user_register',
            payload: data
        })
        localStorage.setItem('userinfor', JSON.stringify(data))
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'user_error',
            payload: err.message
        })
    }
}

export const Update = (formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        console.log(token, formdata)
        const configure = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put('http://localhost:5000/api/user/updateuser', formdata, configure)
        console.log(token, data)
        dispatch({
            type: 'user_update',
            payload: data
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'user_error',
            payload: err.message
        })
    }
}