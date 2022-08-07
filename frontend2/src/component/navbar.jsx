import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BsPerson} from 'react-icons/bs'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {userLogout} from '../actions/useraction'
import {useEffect} from 'react'
import {FiLogOut} from 'react-icons/fi'
import {toast} from 'react-toastify'
import {logoutcart} from '../actions/cartaction'
import {Resetpayment, Resetshippingaddress} from '../actions/shippingaction'
import {Logoutorder} from '../actions/orderaction'
import Searchbox from './Searchbox'

function Navbar() {

    const {user} = useSelector(state => state.User)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClick = () => {
        dispatch(userLogout())
        dispatch(logoutcart())
        dispatch(Resetshippingaddress())
        dispatch(Resetpayment())
        dispatch(Logoutorder())
        toast.success('log out successfully')
        navigate('/')
    }

    return (
        <div className='w-full h-28 bg-zinc-700 text-white flex items-center justify-between px-20 relative'>
            <Searchbox></Searchbox>
            <Link to='/' className='text-3xl font-bold font-mono'>Ecommerce Website</Link>
            <div className='flex inline-flex items-center justify-between'>
                <Link to='/cart' className='mr-10 flex items-center justify-center text-2xl'>
                    <AiOutlineShoppingCart></AiOutlineShoppingCart>
                    <h2 className='text-xl font-mono font-bold ml-2'>Cart</h2>
                </Link>
               
                {user ? (
                    <>
                        <button onClick={onClick} className='mr-10 flex items-center justify-center text-2xl'>
                        <FiLogOut></FiLogOut>
                        <h2 className='text-xl font-mono font-bold ml-2'>Logout</h2>
                        </button>
                        <Link to='/profile' className='mr-10 flex items-center justify-center text-2xl'>
                        <BsPerson></BsPerson>
                        <h2 className='text-xl font-mono font-bold ml-2'>Profile</h2>
                        </Link>
                        {user && user.isAdmin  && (
                            <div className='dropdown'>
                                <label tabIndex='0' className=' cursor-pointer text-xl font-mono font-bold ml-2'>Admin</label>
                                <ul tabIndex='0' className='dropdown-content menu p-2 shadow  rounded-box w-5-2 border-none bg-white'>
                                    <li><Link to='/admin/users' className='text-xl font-mono font-bold text-zinc-800 btn bg-white my-2 border-none hover:bg-zinc-200 hover:text-zinc-800 '>Users</Link></li>
                                    <li><Link to='/admin/products' className='text-xl font-mono font-bold text-zinc-800 btn bg-white my-2 border-none hover:bg-zinc-200 hover:text-zinc-800'>Products</Link></li>

                                    <li><Link to='/admin/orders' className='text-xl font-mono font-bold text-zinc-800 btn bg-white my-2 border-none hover:bg-zinc-200 hover:text-zinc-800'>Orders</Link></li>
                                </ul>
                            </div>
                        )}

                        
                    </>
                    
                ) : (
                    <Link to='/signin' className='mr-10 flex items-center justify-center text-2xl'>
                        <BsPerson></BsPerson>
                        <h2 className='text-xl font-mono font-bold ml-2'>Sign In</h2>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar