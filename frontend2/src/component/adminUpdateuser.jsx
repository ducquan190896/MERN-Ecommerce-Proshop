
import {useParams, useNavigate, Link, useSearchParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'

import {useSelector, useDispatch} from 'react-redux'
import {Admingetsingleuser, AdminuserReset,Adminupdateuser } from '../actions/adminuseraction'

function AdminUpdateuser() {
    const [formdata, setFormdata] = useState({
        email: '',
        name: '',
        isAdmin: false
    })
    const {email, name, isAdmin} = formdata
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess, userUpdate} = useSelector(state => state.User)
    const {orders} = useSelector(state => state.Order)
    const navigate = useNavigate()
    const {userlist, AduserSuccess, AduserError, Aduser} = useSelector(state => state.adminuser)
   
    const {userid} = useParams()

    useEffect(() => {
        dispatch(AdminuserReset())
        if(userid) {
            dispatch(Admingetsingleuser(userid))
             
        }
    }, [userid, dispatch])

    useEffect(() => {
        if(Aduser) {
            setFormdata({
                email: Aduser.email,
                name: Aduser.name,
                isAdmin: Aduser.isAdmin
            })
          }


    }, [Aduser])


    const onChange = (e) => {
        if(e.target.name === 'isAdmin') {
            setFormdata(prevState => ({...prevState, [e.target.name]: e.target.checked}))
        } else {
            setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))
        }
        
    

    }
    const onSubmit = (e) => {
            e.preventDefault()
            console.log(formdata)
            dispatch(Adminupdateuser(userid, formdata))
            navigate('/admin/users')
       
    }


    return (
        <div className='w-1/3 py-10 mx-auto flex flex-col items-left justify-center'>
            <h1 className='text-4xl font-bold font-mono'>Edit User By Admin</h1>
            <form onSubmit={onSubmit} className='w-full flex flex-col mt-8'>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Email</label>
                    <input required type="text" name='email' placeholder='Enter your email...' value={email} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Name</label>
                    <input required type="text" name='name' placeholder='Enter your name...' value={name} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='w-1/4 flex items-left form-control my-4'>
                    <label htmlFor="" className='label cursor-pointer'>
                        <span className='label-text'>Admin</span>
                        <input name='isAdmin' type="checkbox" checked={isAdmin} className="checkbox  checkbox-lg" onChange={onChange} />
                    </label>
                </div>
                <button type='submit' className='btn w-40 h-14 bg-zinc-800 text-white my-6 rounded-none cursor-pointer'>Update</button>
            </form>
          


        </div>
    )
}

export default AdminUpdateuser