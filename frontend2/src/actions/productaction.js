import axios from 'axios'
import { STATES } from 'mongoose'


export const getproducts = (keyword = '', page = 1) => async (disaptch) => {
    try {
        const {data} = await axios.get(`http://localhost:5000/api/products?page=${page}&keyword=${keyword}`)
        disaptch({
            type: 'get_products',
            payload: data
        })
    
    } catch (err) {
        disaptch({
            type: 'product_error',
            payload: err.message
        })
    }
}
export const getproduct = (productid) => async (disaptch) => {
    try {
        const {data} = await axios.get(`/api/products/${productid}`)
        disaptch({
            type: 'get_product',
            payload: data
        })
    
    } catch (err) {
        disaptch({
            type: 'product_error',
            payload: err.message
        })
    }
}
export const getproductAdmin = (productid) => async (disaptch) => {
    try {
        const {data} = await axios.get(`/api/products/${productid}`)
        disaptch({
            type: 'get_product_admin',
            payload: data
        })
    
    } catch (err) {
        disaptch({
            type: 'product_error',
            payload: err.message
        })
    }
}
export const Createproduct = () => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        const {data} = await axios.post('http://localhost:5000/api/products', {}, config)
        console.log(data)
        dispatch({
            type: 'create_product_admin',
            payload: data
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: 'product_error_admin',
            payload: err.message
        })
    }
}

export const Resetadminproduct = () => (dispatch) => {
    dispatch({
        type: 'reset_product'
    })
}
export const ResetadminproductSuccess = () => (dispatch) => {
    dispatch({
        type: 'reset_product_admin'
    })
}

export const Updateproduct = (productid, formdata) => async (dispatch, getState) => {
    try {
        console.log(productid, formdata)
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
       
        const {data} = await axios.put(`http://localhost:5000/api/products/${productid}`, formdata, config)
        console.log(data)
        dispatch({
            type: 'update_product_admin',
            payload: data
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: 'product_error_admin',
            payload: err.message
        })
    }
}

export const Deleteproduct = (productid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
         await axios.delete(`http://localhost:5000/api/products/${productid}`,  config)
        
        dispatch({
            type: 'delete_product_admin',
            payload: productid
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: 'product_error_admin',
            payload: err.message
        })
    }
}

export const Addreview = (productid, formdata)  => async (dispatch, getState) => {
    try {
        console.log(productid, formdata)
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
       const {data} = await axios.post(`http://localhost:5000/api/products/${productid}/review`, formdata, config)

        dispatch({
            type: 'add_review',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'error_review'
        })
    
    }
}