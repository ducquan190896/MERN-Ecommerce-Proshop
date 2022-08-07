import {FaStarHalfAlt, FaStar, FaRegStar} from 'react-icons/fa'
import Moment from 'react-moment'

function ReviewProduct({review}) {
    const {rating, comment, name, createdAt } = review


    return (
        <div className="w-full flex flex-col items-left justify-start my-4">
            <h1 className="text-lg text-zinc-500 font-mono my-2">{name}</h1>
            <div className="flex  items-center my-2  py-4 border-slate-400">
                {rating && rating >= 1 ? <FaStar className="mr-2"/> : rating >= 0.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 2 ? <FaStar className="mr-2"/> : rating >= 1.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 3 ? <FaStar className="mr-2"/> : rating >= 2.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 4 ? <FaStar className="mr-2"/> : rating >= 3.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 5 ? <FaStar className="mr-2"/> : rating >= 4.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                
            </div>
            <p className='my-2'><Moment>{createdAt}</Moment></p>
            <p className='text-md font-mono'>{comment}</p>

        </div>
    )
}

export default ReviewProduct