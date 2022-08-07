import Progressbar from "./Progressbar"
import {Getpayment} from '../actions/shippingaction'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

function Paymentscreen() {
    const [payment, setPayment] = useState('paypal')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChange = (e) => {
        setPayment(e.target.value)
        console.log(payment)
    }
    const onClick = (e) => {
        dispatch(Getpayment(payment))
        navigate('/placeorder')
    }

    return (
        <div className='w-1/3 py-10 mx-auto flex flex-col items-left justify-center'>
            <Progressbar step1 step2 step3/>
            <h1 className="text-4xl font-bold font-mono">Payment Method</h1>
            <h2 className="text-2xl my-6 font-bold  font-mono text-zinc-500">Select Method</h2>
            <div className="flex items-center justify-left w-full">
                <input type="radio" id="paypal" name="paypal" value="paypal" className="radio radio-mg  mr-8" checked onChange={onChange}/>
                <label htmlFor="paypal">Paypal/ Credit Card</label>
            </div>
            <button onClick={onClick} className="btn rounded-none w-40 h-10 text-white bg-gray-7000 mt-10">Next</button>
        </div>
    )
}

export default Paymentscreen