import {useEffect, useState} from 'react'
import {Addproductcart, deleteproductcart} from '../actions/cartaction'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RiDeleteBin5Fill} from 'react-icons/ri'


function Cartscreen() {
    const {cart, cartSuccess, cartError} = useSelector(state => state.Cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkoutbtn = (e) => {
        navigate('/shipping')

    }

    return  (
        <div className='w-full'>
            <h1 className='text-4xl font-bold font-mono text-center my-4'>Shopping Cart</h1>
            <div className='w-full flex items-center justify-start px-10 my-4'>
              <div className='w-2/3 mr-10'>
                    {cart && cart.length > 0 && cart.map(product => {
                        const onChange = (e) => {
                            
                            dispatch(Addproductcart(product.product, e.target.value))
                        }


                        return (
                       
                            <div className='flex inline-flex w-full items-center justify-evenly'>
                                <img src={product.image} alt="" className='w-40 h-40 rounded-lg shadow-lg' />
                                <div className='flex flex-col items-left justify-center w-1/4'>
                                    <h1 className='text-lg font-bold font-mono '>{product.name}</h1>
                                    <h1  className='text-lg font-bold font-mono  my-4'>{product.category}</h1>
                                </div>
                                <p className='font-bold text-2xl'>$ {product.price}</p>
                                <input type="number" min='0' max={product.countInStock} value={product.quantity} className='input input-bordered w-20 text-2xl text-center' onChange={onChange}/>
                                <button type='button' onClick={(e) => dispatch( deleteproductcart(product.product))} className='cursor-pointer'><RiDeleteBin5Fill className='w-6 h-6'></RiDeleteBin5Fill></button>
                            </div>                           
                            )
                    })}
              </div>
              <div className='w-1/3 py-2 border-4 border-zinc-200 flex flex-col items-left justify-center'>
                    <h1 className=' px-6 py-2 text-3xl font-bold font-mono '>SubTotal ({cart && cart.length > 0 && cart.reduce((a, b) => a + b.quantity, 0 )}) Items</h1>
                    <p className='text-xl font-bolf pl-10 py-4  border-b-4 border-zinc-200'>£ {cart && cart.length > 0 && cart.reduce((a, b) => a + (Number(b.price) * Number(b.quantity)), 0)}</p>
                    <div className='p-2  w-full'>
                        <button onClick={checkoutbtn} className=' w-full btn bg-zinc-800 rounded-none '>Proceed to Checkout</button>
                    </div>
              </div>
            </div>
        </div>
    )
}

export default Cartscreen

