import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Progressbar from './Progressbar'
import {GetorderbyID , Resetorder, updateorder, getsingleorderAdmin, updateorderdelivered} from '../actions/orderaction'





function SingleOrderscreenByAdmin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {orderid} = useParams()
    const {order, paidSuccess, paidError, orderSuccess, orderError} =  useSelector(state => state.Order)

    useEffect(() => {
        console.log('123')
        dispatch(getsingleorderAdmin(orderid))
        if(orderSuccess) {
            dispatch(Resetorder())
           }
    }, [orderid, dispatch])
    useEffect(() => {
        
        if(orderSuccess) {
            dispatch(Resetorder())
           }
    }, [orderSuccess])








    if(order) {
        const {shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice, isPaid, isDelivered, itemsPrice, user, orderItems, _id} = order
    
        const {name, email} = user

        return (
            <div className='w-full px-10 py-10 '>
                
                <div className='w-full flex items-left justify-start'>
                    
                    <div className='flex flex-col items-left justify-start px-10 w-3/5 mr-14'>
                    <h1 className='text-4xl font-bold font-mono text-zinc-800 mb-6'>Order {_id}</h1>
                        <div className='border-b-2 border-gray-400 flex flex-col w-full pb-4 mb-4'>
                            <h1 className='text-2xl font-bold font-mono text-zinc-500'>Shipping</h1>
                            <p className='mt-2 text-lg font-mono text-gray-500 mb-4'>{shippingAddress.address} {shippingAddress.city} {shippingAddress.postalcode} {shippingAddress.country}</p>
                            {!isDelivered ? (
                                <div className='bg-red-300 py-2 px-4 w-full text-lg'>
                                    <h1>Not Deliver</h1>
                                </div>
                            ):  (
                                <div className='bg-green-300 py-2 px-4 w-full text-lg'>
                                    <h1>Delivered</h1>
                                </div>
                            )}
                        </div>
                        <div className='border-b-2 border-gray-400 flex flex-col w-full pb-4 mb-4'>
                            <h1 className='text-2xl font-bold font-mono text-zinc-500'>Payment Method</h1>
                            <p className='mt-2 text-lg font-mono text-gray-500 mb-4'>Method: {paymentMethod}</p>
                            {!isPaid ? (
                                <div className='bg-red-300 py-2 px-4 w-full text-lg'>
                                    <h1>Not Paid</h1>
                                </div>
                            ):  (
                                <div className='bg-green-300 py-2 px-4 w-full text-lg'>
                                    <h1>Paid</h1>
                                </div>
                            )}
                        </div>
                        <div className=' flex flex-col w-full pb-4 mb-4'>
                        <h1 className='text-2xl font-bold font-mono text-zinc-500'>Order Items</h1>
                            <div className='flex flex-col items-justify-center w-full p-6 my-4'>
                            {orderItems && orderItems.length > 0 && orderItems.map(item => (
                                <div className='flex items-center justify-between my-2 '>
                                    <img src={item.image} className="w-14 h-14 rounded-lg object-cover" alt="" />
                                    <p className='text-lg text-gray-400'>{item.name}</p>
                                    <p className='text-2xl font-mono '>{item.qty}</p>
                                    <p className='text-lg font-mono '>£{item.price}</p>
                                    <p  className='text-lg font-mono '>£{(item.qty * item.price).toFixed(2)}</p>
                                </div>
                            ))}  
                            </div>
                        </div>
                    </div>
                    <div className='w-2/5 flex flex-col items-left justify-start'>
                                <h1 className='text-2xl font-bold font-mono text-zinc-700 border-2 border-gray-300 px-10 py-4'>Order Summary</h1>
                                <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>Items <small className='text-lg'>£{itemsPrice}</small></p>
                                <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>shipping <small className='text-lg'>£{shippingPrice}</small></p>
                                
                                <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>Tax <small className='text-lg'>£{taxPrice}</small></p>
                                <p className='text-lg flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>Total price + VAT<small className='text-lg'>£{totalPrice}</small></p>
                                <div className='flex inline-flex justify-between font-bold font-mono text-zinc-700 border-2 border-t-0 border-gray-300 px-10 py-4'>
                                    {!isDelivered && (
                                        <button onClick={() =>  dispatch(updateorderdelivered(_id))} className='btn rounded-none w-full h-full' >Mark delivered</button>
                                    )}
                                   
                                </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <h1>No order</h1>
        )
    }

   
}

export default SingleOrderscreenByAdmin