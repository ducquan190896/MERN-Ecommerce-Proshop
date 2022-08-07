import {getproducts} from '../actions/productaction'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Productcard from './Productcard'
import Pagination from './Pagination'
import {useParams} from 'react-router-dom'

function Home() {
    const {products, productLoading, productError, productSuccess, pages,} = useSelector(state => state.Product)
    const dispatch = useDispatch()
    const keyword = useParams().keyword || ''

    useEffect(() => {
        console.log(keyword)
        if(keyword) {
            dispatch(getproducts(keyword, ''))
        } else {
            dispatch(getproducts())
        }
       
    }, [keyword])

    return (
       <div className='w-full min-h-screen bg-white flex flex-col items-center justify-start py-4'>
        <h1 className='text-4xl font-bold font-mono'>Latest Product</h1>
        <div className='grid grid-cols-2 gap-8 place-items-center w-2/3 px-6 my-8 mx-auto'>
            {products && products.length > 0 && products.map(item => <Productcard productitem={item} key={item._id}></Productcard>) }
        </div>
        <Pagination></Pagination>
        
       </div>
    )
} 
export default Home
