import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import Moment from 'react-moment'
import {Getuserlist, AdminuserDelete, AdminuserReset } from '../actions/adminuseraction'
import {BsCheckLg} from 'react-icons/bs'
import {AiOutlineClose, AiFillEdit, AiFillDelete} from 'react-icons/ai'


function Userlistscreen() {
 
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess, userUpdate} = useSelector(state => state.User)
    const {orders} = useSelector(state => state.Order)
    const navigate = useNavigate()
    const {userlist, AduserSuccess, AduserError} = useSelector(state => state.adminuser)
    

    useEffect(() => {
        
       if(user.name && user.isAdmin ) {
        dispatch(Getuserlist())
       
       } else {
        navigate('/sigin')
       }
       dispatch(AdminuserReset())
    }, [user, dispatch])
    // useEffect(() => {
    //     dispatch(Getuserlist())
    // }, [AduserSuccess, dispatch]) 

   const deletebtn = (id) => {
    dispatch(AdminuserDelete(id))
   }

  

    return (  
        <div className='flex flex-col items-left justify-start py-10 w-2/3 mx-auto'>
            <h1 className='text-4xl font-bold font-mono mx-auto'>User List</h1>
            <table className='table table-zebra w-full mt-10'>
                <thead>
                    <tr className='text-lg'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userlist && userlist.length > 0 && userlist.map(item => {
                        const {  _id, name, email, isAdmin} = item
                        return (
                            <tr key={_id} className='text-zinc-500 bg-gray-300'>
                                <th>{_id}</th>
                                <th>{name}</th>
                                <th>{email}</th>
                                <th>{isAdmin ? <BsCheckLg className='w-8 h-8 text-green-600'/> : <AiOutlineClose className='w-8 h-8 text-red-600'/>}</th>
                                <th>
                                    <button onClick={() => deletebtn(_id)} className='btn bg-transparent text-zinc-700 border-none hover:text-white'><AiFillDelete className='w-8 h-8  bg-white-200'/></button>
                                    <Link to={`/admin/users/${_id}`} className='btn bg-transparent text-red-400 border-none hover:text-white'><AiFillEdit className='w-8 h-8 bg-white-200'/></Link>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
       
    )
}

export default Userlistscreen 