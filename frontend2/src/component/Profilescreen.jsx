import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {Update, userReset} from '../actions/useraction'
import {useSelector, useDispatch} from 'react-redux'
import {Getmyorders} from '../actions/orderaction'
import Moment from 'react-moment'

function Profilescreen() {
    const [formdata, setFormdata] = useState({
        email: '',
        password: '',
        name: '',
        password2: ''
    })
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess, userUpdate} = useSelector(state => state.User)
    const {orders} = useSelector(state => state.Order)
    // const {shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice, isPaid, isDelivered, itemsPrice,  orderItems, _id} = order
   
    const {email, password, name, password2} = formdata
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(Getmyorders())
    }, [])

    useEffect(() => {
        setFormdata(prevState => ({
            ...prevState,
            email: user.email,
            name:user.name
        })) 
       
    }, [ user])

    const onChange = (e) => {
        // console.log(e.target.value)
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))

    }
    const onSubmit = (e) => {
        e.preventDefault()
       
        if(password !== password2) {
            toast.error('your passwords dont match to each other')
        } else {
            let obj 
            if(password.length > 0) {
                obj ={name, email, password} 
            } else { 
                obj = {name, email}
            }
                
            dispatch(Update(obj))
            
                if(userUpdate) {
                    toast.success('update successfully')
                    setFormdata({
                        email: '',
                        password: '',
                        name: '',
                        password2: ''
                    })
                    navigate('/') 
                } 
                else if(!userUpdate) {
                    toast.error('update failed')
                }
          
        }
      

    }


    return (
        <div className='w-full px-10 flex items-left'>
            <div className='w-1/3 mr-20 py-10  flex flex-col items-left justify-center'>
            <h1 className='text-4xl font-bold font-mono'>Update Your Profile</h1>
            <form onSubmit={onSubmit} className='w-full flex flex-col mt-8'>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Name</label>
                    <input required type="text" name='name' placeholder='Enter your name...' value={name} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Email</label>
                    <input required type="text" name='email' placeholder='Enter your email...' value={email} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Password</label>
                    <input type="password" name='password' placeholder='Enter your password...' value={password} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'> Confirm Password</label>
                    <input type="password" name='password2' placeholder='Enter your password again...' value={password2} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
               
                
                <button type='submit' className='btn w-40 h-14 bg-zinc-800 text-white my-6 rounded-none cursor-pointer'>Update</button>
            </form>
            


        </div>
        <div className='flex flex-col items-left justify-start py-10 w-2/3'>
            <h1 className='text-4xl font-bold font-mono'>My Order</h1>
            <table className='table table-zebra w-full mt-10'>
                <thead>
                    <tr className='text-lg'>
                        <th>orderID</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>view Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 && orders.map(item => {
                        const {  totalPrice, isPaid, isDelivered, _id, updatedAt} = item
                        return (
                            <tr key={_id} className='text-zinc-500 bg-gray-300'>
                                <th>{_id}</th>
                                <th><Moment format='MMMM Do YYYY, h:mm:ss a'>{updatedAt}</Moment></th>
                                <th>{totalPrice.toFixed(2)}</th>
                                <th>{isPaid ? 'YES': 'NO'}</th>
                                <th>{isDelivered ? 'YES': 'NO'}</th>
                                <th className='text-zinc-700'><Link to={`/order/${_id}`}>View</Link></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Profilescreen 