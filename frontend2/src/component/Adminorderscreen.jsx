import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import Moment from 'react-moment'
import {Getuserlist, AdminuserDelete, AdminuserReset } from '../actions/adminuseraction'
import {BsCheckLg} from 'react-icons/bs'
import {AiOutlineClose, AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {Resetorder, getAllOrders} from '../actions/orderaction'



function Adminorderscreen() {
 
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess, userUpdate} = useSelector(state => state.User)
    const {orders, order, orderSuccess, orderMessage, orderError} = useSelector(state => state.Order)
    const navigate = useNavigate()

    useEffect(() => {
        
       if(user && user.isAdmin ) {
        dispatch(getAllOrders())
       
       } else {
        navigate('/sigin')
       }
      
    
    }, [user])
    useEffect(() => {
        if(orderSuccess) {
            dispatch(Resetorder())
           }
    }, [orderSuccess, orders])
      

    return (  
        <div className='flex flex-col items-left justify-start py-10 w-2/3 mx-auto relative'>
        
            <h1 className='text-4xl font-bold font-mono mx-auto'>Order List</h1>
            <table className='table table-zebra w-full mt-10'>
                <thead>
                    <tr className='text-lg'>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 && orders.map(item => {
                        const {  _id, user, createdAt, isPaid, isDelivered, totalPrice} = item
                        return (
                            <tr key={_id} className='text-zinc-500 bg-gray-300'>
                                <th>{_id}</th>
                                <th>{user.email}</th>
                                <th><Moment>{createdAt}</Moment></th>
                                <th>{isPaid ? <BsCheckLg className='w-8 h-8 text-green-600'/> : <AiOutlineClose className='w-8 h-8 text-red-600'/>}</th>
                                <th>{isDelivered ? <BsCheckLg className='w-8 h-8 text-green-600'/> : <AiOutlineClose className='w-8 h-8 text-red-600'/>}</th>
                                <th><Link to={`/admin/singleorderscreenByAdmin/${_id}`} className='text-xl text-black font-bold hover:text-lg text-gray-400'>View Details</Link></th>
                                
                               
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
       
    )
}

export default Adminorderscreen
