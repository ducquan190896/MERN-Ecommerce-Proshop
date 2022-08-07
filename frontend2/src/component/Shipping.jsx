import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {userReset} from '../actions/useraction'
import {useSelector, useDispatch} from 'react-redux'
import {Getshippingaddress} from '../actions/shippingaction'
import Progressbar from './Progressbar'

function Shipping() {
    const [formdata, setFormdata] = useState({
        address: '',
        city: '',
        postalcode: '',
        country: ''
    })

    const {address, city, postalcode, country} = formdata
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess} = useSelector(state => state.User)
    const {cart} = useSelector(state => state.Cart)
    const {shippingaddress} = useSelector(state => state.Shipping)
    useEffect(() => {   
        if(shippingaddress) {
            setFormdata(shippingaddress)
        }
    }, [shippingaddress])
    const {email, password} = formdata
    const navigate = useNavigate()

    

    const onChange = (e) => {
        
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))

    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(Getshippingaddress(formdata))
        toast.success('fill addres successfully')
        navigate('/payment')
        // setFormdata({
        //     address: '',
        //     city: '',
        //     postalcode: '',
        //     country: ''
        // })
     
      
    }


    return (
        <div className='w-1/3 py-10 mx-auto flex flex-col items-left justify-center'>
            <Progressbar step1 step2></Progressbar>
            <h1 className='text-4xl font-bold font-mono'>Shipping</h1>
            <form onSubmit={onSubmit} className='w-full flex flex-col mt-8'>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Address</label>
                    <input required type="text" name='address' placeholder='Enter your address...' value={address} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>City</label>
                    <input required type="text" name='city' placeholder='Enter your city...' value={city} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Postal Code</label>
                    <input required type="text" name='postalcode' placeholder='Enter your postalcode...' value={postalcode} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Country</label>
                    <input required type="text" name='country' placeholder='Enter your country...' value={country} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <button type='submit' className='btn w-40 h-14 bg-zinc-800 text-white my-6 rounded-none cursor-pointer'>Continue</button>
            </form>
           


        </div>
    )
}

export default Shipping