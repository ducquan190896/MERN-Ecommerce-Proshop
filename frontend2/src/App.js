import { Provider } from "react-redux";
import Home from "./component/home";
import Navbar from "./component/navbar";
import store from "./store";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Productdetail from "./component/Productdetail";
import Cartscreen from "./component/cartscreen";
import Shipping from "./component/Shipping";
import Signinscreen from "./component/Signin";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Registerscreen from "./component/Registerscreen";
import Profilescreen from './component/Profilescreen'
import Privateroute from "./component/Privateroute";
import Paymentscreen from "./component/Paymentscreen";
import Placeorder from "./component/placeorderScreen";
import Orderscreen from "./component/orderScreen";
import Userlistscreen from "./component/userlistscreen";
import Adminprivateroute from "./component/Adminprivateroute";
import AdminUpdateuser from "./component/adminUpdateuser";
import Adminproductlist from "./component/Adminproductlist";
import Adminproductedit from "./component/Admintproductedit";
import Adminorderscreen from "./component/Adminorderscreen";
import SingleOrderscreenByAdmin from "./component/singleorderScreenByAdmin";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="w-full min-h-screen">
        <Navbar></Navbar>
       <Routes>
          <Route path="/" element={<Home></Home>} exact></Route>
          <Route path="/keyword/:keyword/page/:page" element={<Home></Home>} exact></Route>
          <Route exact path="/page/:page" element={<Home></Home>}></Route>
          <Route path="/keyword/:keyword" element={<Home></Home>} exact></Route>
          <Route path="/product/:productid" element={<Productdetail/>}></Route>
          <Route path="/cart" element={<Cartscreen/>}></Route>
          <Route path="/Shipping" element={<Privateroute/>}>
            <Route path="/Shipping" element={<Shipping/>}></Route>
          </Route>
          <Route path="/payment" element={<Privateroute/>}>
            <Route path="/payment" element={<Paymentscreen/>}></Route>
          </Route>

          <Route path="/placeorder" element={<Privateroute/>}>
            <Route path="/placeorder" element={<Placeorder/>}></Route>
          </Route>
          <Route path="/order/:orderid" element={<Privateroute/>}>
            <Route path="/order/:orderid" element={<Orderscreen/>}></Route>
          </Route>

          <Route path="/signin" element={<Signinscreen/>}></Route>
          <Route path="/register" element={<Registerscreen/>}></Route>
          <Route path="/profile" element={<Privateroute/>}>
            <Route path="/profile" element={<Profilescreen/>}></Route>
          </Route>
          <Route path="/admin/users" element={<Adminprivateroute/>}>
          <Route path="/admin/users" element={<Userlistscreen/>}></Route>
          </Route>

          <Route path="/admin/users/:userid" element={<Adminprivateroute/>}>
          <Route path="/admin/users/:userid" element={<AdminUpdateuser/>}></Route>
          </Route>

          <Route path="/admin/products" element={<Adminprivateroute/>}>
          <Route path="/admin/products" element={<Adminproductlist/>}></Route>
          </Route>

          <Route path="/admin/products/:productid/edit" element={<Adminprivateroute/>}>
          <Route path="/admin/products/:productid/edit" element={<Adminproductedit/>}></Route>
          </Route>
          <Route path="/admin/orders" element={<Adminprivateroute/>}>
          <Route path="/admin/orders" element={<Adminorderscreen/>}></Route>
          </Route>

          <Route path="/admin/singleorderscreenByAdmin/:orderid" element={<Adminprivateroute/>}>
          <Route path="/admin/singleorderscreenByAdmin/:orderid" element={<SingleOrderscreenByAdmin/>}></Route>
          </Route>

       </Routes>
       <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
      </div>
    </Router>
     
    </Provider>
  );
}

export default App;
