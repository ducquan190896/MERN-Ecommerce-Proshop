import {useSelector, useDispatch} from 'react-redux'
import {getproducts} from '../actions/productaction'
import {useParams, useSearchParams, useNavigate, Navigate} from 'react-router-dom'
import { useEffect } from 'react'

function Pagination() {

    const {pages, page, products} = useSelector(state => state.Product) 
    const dispatch = useDispatch()
    const keywordparams = useParams().keyword || ''
    const pageparams = useParams().page || 1
    
    const onClick = (inputpage) => {
        dispatch(getproducts(keywordparams, inputpage))
        
        
    }
    

    if(pages > 1 && products) {
        return (
            <div className='my-10'>
                <div className='btn-group'>
                    {[...Array(pages).keys()].map(item => <button onClick={() => onClick(item +1)} key={item} className={item + 1 === page ? 'btn btn-active': 'btn'}>{item + 1}</button>)}
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }

}

export default Pagination