import axios from 'axios'

export const Getuserlist = () => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Beaerer ${token}`
            }
        }

        const {data} = await axios.get('http://localhost:5000/admin/users', config)

        console.log(data)
        dispatch({
            type: 'admin_user_list',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'admin_user_error',
            payload: err.message
        })
    }
}

export const AdminuserDelete = (userid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Beaerer ${token}`
            }
        }

        const {data} = await axios.delete(`http://localhost:5000/admin/users/${userid}`, config)

        
        dispatch({
            type: 'admin_user_delete',
            payload: userid
            
        })
    } catch (err) {
        dispatch({
            type: 'admin_user_error',
            payload: err.message
        })
    }
}
export const AdminuserReset = () => (dispatch) => {
    dispatch({
        type: 'admin_user_reset'
    })
}
export const AdminuserLogou = () => (dispatch) => {
    dispatch({
        type: 'admin_user_logout'
    })
}

export const Admingetsingleuser= (userid) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Beaerer ${token}`
            }
        }

        const {data} = await axios.get(`http://localhost:5000/admin/users/${userid}`, config)

        
        dispatch({
            type: 'admin_user_single',
            payload: data
            
        })
    } catch (err) {
        dispatch({
            type: 'admin_user_error',
            payload: err.message
        })
    }
}
export const Adminupdateuser= (userid, formdata) => async (dispatch, getState) => {
    try {
        const {user: {token}} = getState().User
        const config = {
            headers: {
                'Authorization': `Beaerer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put(`http://localhost:5000/admin/users/${userid}`, formdata, config)

        
        dispatch({
            type: 'admin_user_update',
            payload: data
            
        })
    } catch (err) {
        dispatch({
            type: 'admin_user_error',
            payload: err.message
        })
    }
}