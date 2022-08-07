import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import Moment from 'react-moment'
import {Getuserlist, AdminuserDelete, AdminuserReset } from '../actions/adminuseraction'
import {BsCheckLg} from 'react-icons/bs'
import {AiOutlineClose, AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {getproducts, Createproduct, Resetadminproduct, Deleteproduct} from '../actions/productaction'


function Adminproductlist() {
 
    const dispatch = useDispatch()
    const {user, userMessage, userError, userSuccess, userUpdate} = useSelector(state => state.User)
  
    const navigate = useNavigate()
    
    const {products, productError, productSuccess, message, adminProduct, adminProSuccess, adminProError} = useSelector(state => state.Product)


    

    useEffect(() => {
        
       if(user.name && user.isAdmin ) {
        dispatch(getproducts())
       
       } else {
        navigate('/sigin')
       }
       dispatch(AdminuserReset())
       dispatch(Resetadminproduct())
    }, [user, dispatch])
    

   const deletebtn = (id) => {
    console.log('delete product')
    dispatch(Deleteproduct(id))
   }
   
   useEffect(() => {
    if(adminProduct) {
        navigate(`/admin/products/${adminProduct._id}/edit`)
        dispatch(Resetadminproduct())
       }
       if(productSuccess) {
        dispatch(Resetadminproduct())
    }
    
   }, [adminProduct, productSuccess])

  const Adduserbtn = (e) => {
    dispatch(Createproduct())
    
    
  }

    return (  
        <div className='flex flex-col items-left justify-start py-10 w-2/3 mx-auto relative'>
            <button onClick={Adduserbtn} className='absolute top-10 right-0  btn btn-infor w-40 h-10'>Add User</button>
            <h1 className='text-4xl font-bold font-mono mx-auto'>Product List</h1>
            <table className='table table-zebra w-full mt-10'>
                <thead>
                    <tr className='text-lg'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 && products.map(item => {
                        const {  _id, name, price, category, brand} = item
                        return (
                            <tr key={_id} className='text-zinc-500 bg-gray-300'>
                                <th>{_id}</th>
                                <th>{name}</th>
                                <th>{price}</th>
                                <th>{category}</th>
                                <th>{brand}</th>
                                <th>
                                    <button onClick={() => deletebtn(_id)} className='btn bg-transparent text-zinc-700 border-none hover:text-white'><AiFillDelete className='w-8 h-8  bg-white-200'/></button>
                                    <Link to={`/admin/products/${_id}/edit`} className='btn bg-transparent text-red-400 border-none hover:text-white'><AiFillEdit className='w-8 h-8 bg-white-200'/></Link>
                                </th>
                               
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
       
    )
}

export default Adminproductlist