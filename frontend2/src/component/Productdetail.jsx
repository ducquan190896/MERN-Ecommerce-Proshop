
import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getproduct, Addreview, Resetadminproduct} from '../actions/productaction'
import {useSelector, useDispatch} from 'react-redux'
import {FaStarHalfAlt, FaStar, FaRegStar} from 'react-icons/fa'
import {Addproductcart} from '../actions/cartaction'
import ReviewProduct from './ReviewProduct'

function Productdetail() {
    const {productid} = useParams()
    const {products, product, productSuccess, productError, productLoading, reviewError, reviewSuccess} = useSelector(state => state.Product)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const [buttondisable, setButtondisable] = useState(false)
    const [reviewrating, setReviewrating] = useState(5)
    const [comment, setComment] = useState('')
    
    
    useEffect(() => {
        console.log(productid)
        if(productid) {
            dispatch(getproduct(productid))
        }
        
    }, [productid, dispatch])
    useEffect(() => {
        if(reviewSuccess) {
            dispatch(Resetadminproduct())
        }
        if(productid) {
            dispatch(getproduct(productid))
        }
    }, [reviewSuccess, dispatch])

    const onChange = (e) => {
        setQuantity(e.target.value)
        console.log(quantity)
    }

    const submitReview = (e) => {
        e.preventDefault()
        
        const formdata = {
            rating: Number(reviewrating),
           comment: comment
        }
        console.log(formdata)
       dispatch(Addreview(productid, formdata))
    setReviewrating(5)
    setComment('')
    }
   
    
    if(product) {
        const {_id, user, name, image, description, numReviews, rating, price, brand, category, countInStock, reviews, createdAt, updatedAt} = product

        const onClick= (e) => {
           dispatch(Addproductcart(_id, quantity))
            navigate('/cart')
        }
       
       

       return (
        <div className='flex flex-col w-full min-h-screen bg-zinc-300 px-20 py-10 '>
            <div className='w-full h-full flex items-start pt-20 justify-center  relative'>
        
        <img src={image} alt="/product" className='w-1/3 h-2/3 rounded-lg' />
        <div className='flex flex-col items-left justify-center w-1/3 ml-14 mr-8'>
            <h1 className='text-2xl text-zinc-800 font-bold font-mono'>{name}</h1>
            <div className="flex  items-center my-4 border-y-4 py-4 border-slate-400">
                {rating && rating >= 1 ? <FaStar className="mr-2"/> : rating >= 0.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 2 ? <FaStar className="mr-2"/> : rating >= 1.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 3 ? <FaStar className="mr-2"/> : rating >= 2.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 4 ? <FaStar className="mr-2"/> : rating >= 3.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 5 ? <FaStar className="mr-2"/> : rating >= 4.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                <h2 className='text-lg font-bold font-mono ml-8'>{numReviews} Reviews</h2>
            </div>
            <p className='text-xl font-mono py-4 shadow-2xl px-4 rounded-lg bg-zinc-400'>Price: £{price} </p>
            <p className='text-lg font-mono my-4'>Description: {description} </p>
        </div>
        <div className='flex flex-col items-center justify-center w-1/4'>
            <div className='flex justify-between items-center px-8 border-4 py-6 px-4 w-full   border-gray-400'>
                <h1 className='text-lg font-bold'>Price</h1>
                <h1 className='text-lg'>£{price}</h1>
            </div>
            <div className='flex justify-between items-center px-8 border-x-4 border-b-4 py-6 px-4 w-full   border-gray-400'>
                <h1 className='text-lg font-bold'>Status</h1>
                <h1 className='text-lg'>{countInStock > 0 ? 'In Stock': 'Out of Stock'}</h1>
            </div>
            {countInStock > 0 && (
                <div className='flex justify-between items-center px-8 border-x-4 border-b-4 py-6 px-4 w-full   border-gray-400'>
                <h1 className='text-lg font-bold'>Quantity</h1>
                <input type="number" max={countInStock} min='0' value={quantity} onChange={onChange} className='input input-bordered' />
            </div>
            )}
            <div className='flex justify-center items-center  px-2 border-x-4 border-b-4 py-2 px-4 w-full   border-gray-400'>
                <button disabled={countInStock === 0 ? true : false} onClick={onClick} className='btn bg-zinc-700 text-center rounded-none w-full h-16'>Add To Cart</button>
            </div>
            
        </div>
    </div>
    <div className='w-full flex  items-left justify-start my-20'>
                <div className='flex flex-col w-1/2 mr-10 items-left justify-start pl-20'>
                    {reviews && reviews.length > 0 && reviews.map(r => <ReviewProduct review={r}></ReviewProduct>)}
                </div>
                <form action="" className='w-1/3 flex flex-col items-left justify-start' onSubmit={submitReview}>
                    <h1 className='text-2xl font-bold font-mono'>Write your comment about product</h1>
                    <div className='flex flex-col items-left w-full'>
                        <label htmlFor="" className='text-lg font-bold font-mono my-2'>Rating</label>
                        <select name="rating" id="" className="input input-bordered w-full" value={reviewrating} onChange={(e) => setReviewrating(e.target.value)}>
                            <option value="1">1-bad</option>
                            <option value="2">2-not bad</option>
                            <option value="3">3-normal</option>
                            <option value="4">4-good</option>
                            <option value="5">5-excellent</option>
                        </select>
                    </div>
                    <div className='flex flex-col items-left w-full'>
                        <label htmlFor="" className='text-lg font-bold font-mono my-2' >Comment</label>
                        <input value={comment} type="text" className="my-2 input input-bordered w-full"  placeholder='type your feedback here...' onChange={(e) => setComment(e.target.value)}/>
                    </div>
                    <button className='w-full btn mt-6 bg-zinc-700 text-center rounded-none'>Add Your Review</button>
                </form>
    </div>
        </div>
       )
    }

    
}

export default Productdetail