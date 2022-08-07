import {Link} from 'react-router-dom'


function Progressbar({step1, step2, step3, step4}) {
    return (
        <div className="w-full flex items-center justify-between my-8">
            {step1 ? (
                <Link to='/signin' className='text-zinc-800 text-lg font-mono'>Sign In</Link>
            ): <Link to='/signin' style={{pointerEvents: 'none'}} className='text-zinc-300 text-lg font-mono'>Sign In</Link>}
            {step2 ? (
                <Link to='/shipping' className='text-zinc-800 text-lg font-mono'>Shipping</Link>
            ): <Link to='/shipping' style={{pointerEvents: 'none'}} className='text-zinc-300 text-lg font-mono'>Shipping</Link>}
            {step3 ? (
                <Link to='/payment' className='text-zinc-800 text-lg font-mono'>Payment</Link>
            ): <Link to='/payment' style={{pointerEvents: 'none'}} className='text-zinc-300 text-lg font-mono'>Payment</Link>}
            {step4 ? (
                <Link to='/placeorder' className='text-zinc-800 text-lg font-mono'>Place Order</Link>
            ): <Link to='/placeorder' style={{pointerEvents: 'none'}} className='text-zinc-300 text-lg font-mono'>Place Order</Link>}
        </div>
    )
}

export default Progressbar