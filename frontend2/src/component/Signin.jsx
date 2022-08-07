
import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {Signin, userReset} from '../actions/useraction'
import {useSelector, useDispatch} from 'react-redux'

function Signinscreen() {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess} = useSelector(state => state.User)
    const {cart} = useSelector(state => state.Cart)
    const {email, password} = formdata
    const navigate = useNavigate()

    // useEffect(() => {
    //     // if(userSuccess) {
    //     //     toast.success('login successfully')
    //     // }
    //     // if(userError) {
    //     //     toast.error('login failed')
    //     // }
    // }, [dispatch, user, userError, userSuccess])

    const onChange = (e) => {
        
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))

    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(Signin(formdata))
        setFormdata({
            email: '',
            password: ''
        })
        if(cart.length > 0) {
            navigate('/cart')
        } else {
            navigate('/')
        }
        if(userSuccess) {
            toast.success('login successfully')
        }
        if(userError) {
            toast.error('login failed')
        }
    }


    return (
        <div className='w-1/3 py-10 mx-auto flex flex-col items-left justify-center'>
            <h1 className='text-4xl font-bold font-mono'>Sign In</h1>
            <form onSubmit={onSubmit} className='w-full flex flex-col mt-8'>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Email</label>
                    <input required type="text" name='email' placeholder='Enter your email...' value={email} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Password</label>
                    <input required type="password" name='password' placeholder='Enter your password...' value={password} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <button type='submit' className='btn w-40 h-14 bg-zinc-800 text-white my-6 rounded-none cursor-pointer'>Sign In</button>
            </form>
            <h1 className='my-2 text-2xl text-zinc-600 font-mono'>New Customer ? <Link to='/register'>Register</Link></h1>


        </div>
    )
}

export default Signinscreen