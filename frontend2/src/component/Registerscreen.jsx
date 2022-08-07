
import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {Register, userReset} from '../actions/useraction'
import {useSelector, useDispatch} from 'react-redux'

function Registerscreen() {
    const [formdata, setFormdata] = useState({
        email: '',
        password: '',
        name: '',
        password2: ''
    })
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess} = useSelector(state => state.User)

    const {email, password, name, password2} = formdata
    const navigate = useNavigate()

    useEffect(() => {
        if(user) {
           
            
                // dispatch(userReset())
                navigate('/')
            
        }
    }, [dispatch, user])

    const onChange = (e) => {
        // console.log(e.target.value)
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))

    }
    const onSubmit = (e) => {
        e.preventDefault()
       
        if(password !== password2) {
            toast.error('your passwords dont match to each other')
        } else {
            dispatch(Register({name, email, password}))
            if(userSuccess) {
                toast.success('login successfully')
                setFormdata({
                    email: '',
                    password: '',
                    password2: '',
                    name: ''
                })
            } 
            else  {
                toast.error('login failed')
            }
        }
      

    }


    return (
        <div className='w-1/3 py-10 mx-auto flex flex-col items-left justify-center'>
            <h1 className='text-4xl font-bold font-mono'>Register</h1>
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
                    <input required type="password" name='password' placeholder='Enter your password...' value={password} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'> Confirm Password</label>
                    <input required type="password" name='password2' placeholder='Enter your password again...' value={password2} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
               
                
                <button type='submit' className='btn w-40 h-14 bg-zinc-800 text-white my-6 rounded-none cursor-pointer'>Sign Up</button>
            </form>
            


        </div>
    )
}

export default Registerscreen 