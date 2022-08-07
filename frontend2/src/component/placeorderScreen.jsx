import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Progressbar from './Progressbar'
import {CreateOrder, Resetorder} from '../actions/orderaction'

function Placeorder() {

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const {cart, cartSuccess} = useSelector(state => state.Cart)
    const {user} = useSelector(state => state.User) 
    const {shippingaddress, payment, shippingSuccess, paymentSuccess} = useSelector(state => state.Shipping)
    const  {city, country, postalcode, address} = shippingaddress
    const {order, orderSuccess} = useSelector(state => state.Order) 

     const totalprice = cart.reduce((a, b) => a + (Number(b.price) * Number(b.quantity)), 0).toFixed(2)
    const shippingfee = Number(totalprice) > 5 ? 0 : 2
    const tax = (Number(totalprice) * 0.1).toFixed(2)
    const finalprice = Number(totalprice) +  Number(tax) + Number(shippingfee)

    const [formdata, setFormdata] = useState('')

    useEffect(() => {
        setFormdata({
            orderItems: cart.map(item => ({
                name: item.name,
                product: item.product,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            shippingAddress: shippingaddress,
            paymentMethod: payment,
            
            itemsPrice: Number(totalprice),
            taxPrice: Number(tax),
            shippingPrice: Number(shippingfee),
            totalPrice: Number(finalprice)
        })
    }, [user, payment, cart, shippingaddress])

    useEffect(() => {
        if(order && orderSuccess) {
            navigate(`/order/${order._id}`)
        }

    }, [dispatch, orderSuccess, order])

    const placeorderbutton = async () => {
        // console.log(formdata)
         dispatch(Resetorder())
         dispatch(CreateOrder({
            orderItems: cart.map(item => ({
                name: item.name,
                product: item.product,
                price: item.price,
                qty: item.quantity,
                image: item.image
            })),
            shippingAddress: shippingaddress,
            paymentMethod: payment,
            
            itemsPrice: Number(totalprice),
            taxPrice: Number(tax),
            shippingPrice: Number(shippingfee),
            totalPrice: Number(finalprice)
         }))
        // setFormdata('')
        
    }

    return (
        <div className='w-full px-10 py-6 '>
            <div className='w-1/3 mx-auto'>
                <Progressbar step1 step2 step3 step4 ></Progressbar>
            </div>
            <div className='w-full flex items-left justify-start'>
                <div className='flex flex-col items-left justify-start px-10 w-3/5 mr-14'>
                    <div className='border-b-2 border-gray-400 flex flex-col w-full pb-4 mb-4'>
                        <h1 className='text-2xl font-bold font-mono text-zinc-500'>Shipping</h1>
                        <p className='mt-2 text-lg font-mono text-gray-500'>{address} {city} {postalcode} {country}</p>
                    </div>
                    <div className='border-b-2 border-gray-400 flex flex-col w-full pb-4 mb-4'>
                        <h1 className='text-2xl font-bold font-mono text-zinc-500'>Payment Method</h1>
                        <p className='mt-2 text-lg font-mono text-gray-500'>Method: {payment}</p>
                    </div>
                    <div className='border-b-2 border-gray-400 flex flex-col w-full pb-4 mb-4'>
                    <h1 className='text-2xl font-bold font-mono text-zinc-500'>Order Items</h1>
                        <div className='flex flex-col items-justify-center w-full p-6 my-4'>
                        {cart && cart.length > 0 && cart.map(item => (
                            <div className='flex items-center justify-between my-2'>
                                <img src={item.image} className="w-14 h-14 rounded-lg object-cover" alt="" />
                                <p className='text-lg text-gray-400'>{item.name}</p>
                                <p className='text-2xl font-mono '>{item.quantity}</p>
                                <p className='text-lg font-mono '>£{item.price}</p>
                                <p  className='text-lg font-mono '>£{(item.quantity * item.price).toFixed(2)}</p>
                            </div>
                        ))}  
                        </div>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col items-left justify-start'>
                            <h1 className='text-2xl font-bold font-mono text-zinc-700 border-2 border-gray-300 px-10 py-4'>Order Summary</h1>
                            <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>Items <small className='text-lg'>£{totalprice}</small></p>
                            <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>shipping <small className='text-lg'>£{shippingfee}</small></p>
                            
                            <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>Tax <small className='text-lg'>£{tax}</small></p>
                            <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>Total price + VAT<small className='text-lg'>£{finalprice}</small></p>
                            <div className='flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>
                                <button onClick={placeorderbutton} className='btn rounded-none w-full h-full'>Place Order</button>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default Placeorder