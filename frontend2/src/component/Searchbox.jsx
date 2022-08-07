import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "../actions/productaction";
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'

function Searchbox() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    

    const dispatch = useDispatch()
    const {products, page, pages} = useSelector(state => state.Product)

    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const keyword = useParams().keyword || ''
    const pageparams = useParams().page || ''
    

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(search)
       
      if(search) {
        navigate(`/keyword/${search}`)
      }
    }

    const onClick = () => {
        setSearch('')
        
    }

    return (
        <form onSubmit={onSubmit} className="absolute top-10 left-1/3 form-control w-1/4">
            
            {search && <button onClick={onClick}><Link to='/' className="absolute -bottom-28 -left-96 text-lg btn">Back</Link></button>}
            <div className="input-group w-full">
                <input type="text" value={search} onChange={onChange} placeholder="search..." className="px-4 w-full text-zinc-700 hover:outline-none"/>
                <button className="btn btn-info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                
                
            </div>
        </form>
    )
}

export default Searchbox