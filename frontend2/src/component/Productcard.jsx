import { useEffect, useState } from "react"
import {FaStarHalfAlt, FaStar, FaRegStar} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'

function Productcard({productitem}) {
    const {_id, user, name, image, description, numReviews, rating, price, brand, category, countInStock, reviews, createdAt, updatedAt} = productitem
    const navigate = useNavigate()

    const onClick = (e) => {

        navigate(`/product/${_id}`)
    }
  

    return (
        <div onClick={onClick} className=" w-80 h-96 flex flex-col items-center justify-center border-4 border-gray-300  shadow-2xl p-4 rounded-lg cursor-pointer">
            <img src={image} alt="" className="w-72 h-60 rounded-lg" />
            <h2 className="my-2 text-lg font-bold font-mono tex-center">{name}</h2>
            <h2 className="my-2 text-lg font-bold font-mono tex-center ">{price} £</h2>
            <div className="flex inline-flex items-center justify-between">
                {rating && rating >= 1 ? <FaStar className="mr-2"/> : rating >= 0.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 2 ? <FaStar className="mr-2"/> : rating >= 1.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 3 ? <FaStar className="mr-2"/> : rating >= 2.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 4 ? <FaStar className="mr-2"/> : rating >= 3.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}
                {rating && rating >= 5 ? <FaStar className="mr-2"/> : rating >= 4.5 ? <FaStarHalfAlt className="mr-2"/> : <FaRegStar className="mr-2"/>}

               
            </div>

        </div>
    )
}

export default Productcard