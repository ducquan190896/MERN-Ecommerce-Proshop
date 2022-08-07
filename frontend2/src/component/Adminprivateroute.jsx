import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Adminprivateroute() {
    const {user} = useSelector(state => state.User)

    return (
        <>
        {user && user.isAdmin ? <Outlet></Outlet> : <Navigate to='/signin'/>}
        </>
    )
}

export default Adminprivateroute