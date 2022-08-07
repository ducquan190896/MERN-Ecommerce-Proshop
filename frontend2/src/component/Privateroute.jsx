import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Privateroute() {
    const {user} = useSelector(state => state.User)

    return (
        <>
        {user ? <Outlet></Outlet> : <Navigate to='/signin'/>}
        </>
    )
}

export default Privateroute