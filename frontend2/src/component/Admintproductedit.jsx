import {useParams, useNavigate, Link, useSearchParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Admingetsingleuser, AdminuserReset,Adminupdateuser } from '../actions/adminuseraction'
import {getproducts, Createproduct, Resetadminproduct, Updateproduct, getproduct, ResetadminproductSuccess, getproductAdmin} from '../actions/productaction'

function Adminproductedit() {
    const [formdata, setFormdata] = useState({
        name: '',
        price: '',
        image: '',
        brand: '',
        description: '',
        category: '',
        rating: 0,
        countInStock: 0,
        numReviews: 0,
        reviews: []
    })
    const {name, price, image, brand, description, category, rating, countInStock, numReviews, reviews} = formdata
    const dispatch = useDispatch()   
    const navigate = useNavigate()
  
    const {products, product, productError, productSuccess, message, adminProduct, adminProSuccess, adminProError} = useSelector(state => state.Product)
   
    const {productid} = useParams()

   

    useEffect(() => {
       if(!adminProduct || adminProduct._id.toString() !== productid.toString()) {
        dispatch(getproductAdmin(productid))
        // dispatch(ResetadminproductSuccess())
       }
       if(adminProduct) {
        setFormdata(product)
    }
    if(productSuccess) {
        dispatch(Resetadminproduct())
    }
    }, [productid, productSuccess])

    useEffect(() => {
        if(adminProSuccess) {
            dispatch(ResetadminproductSuccess())
            navigate('/admin/products')
        }
        if(productSuccess) {
            dispatch(Resetadminproduct())
        }
    }, [dispatch, adminProSuccess, adminProduct, product])
    
    const uploadimage = async (files) => {
        try {
            const formdata = new FormData()
            // console.log(formdata)
        formdata.append('image', files[0])

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.post('http://localhost:5000/api/upload', formdata, config)
        return data
        } catch (err) {
            console.log(err.message)
        }
    } 


    const onChange = async (e) => {

        if(e.target.files) {
        //    console.log(e.target.files)
           const imagepath = await uploadimage(e.target.files)
        //    console.log(imagepath)
           setFormdata(prevState => ({...prevState, image: imagepath}))        

        } else {
       
            setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))        
        }
    }
    const onSubmit = (e) => {
            e.preventDefault()
            console.log(productid, formdata)
            dispatch(Updateproduct(productid, formdata))
          
       
    }


    return (
        <div className='w-1/3 py-10 mx-auto flex flex-col items-left justify-center'>
            <h1 className='text-4xl font-bold font-mono'>Edit User By Admin</h1>
            <form onSubmit={onSubmit} className='w-full flex flex-col mt-8'>
               
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Name</label>
                    <input required type="text" name='name' value={name} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Price</label>
                    <input required type="number" name='price' value={price} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Image</label>
                    <input  type="file" name='image' onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Brand</label>
                    <input required type="text" name='brand' value={brand} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Count in Stock</label>
                    <input required type="number" name='countInStock' value={countInStock} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Category</label>
                    <input required type="text" name='category' value={category} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                 
                </div>
                <div className='flex w-full flex-col items-left justify-center'>
                    <label className='text-2xl font-mono my-2 text-zinc-500'>Description</label>
                    <input required type="text" name='description' value={description} onChange={onChange}  className='w-full input input-bordered rounded-none'/>
                 
                 
                </div>
                
            
            
                <button type='submit' className='btn w-40 h-14 bg-zinc-800 text-white my-6 rounded-none cursor-pointer'>Update</button>
            </form>
          


        </div>
    )
}

export default Adminproductedit