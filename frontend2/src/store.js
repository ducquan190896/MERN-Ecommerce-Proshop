import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cartReducer';

import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';
import shippingReducer from './reducers/shippingReducer';
import orderReducer from './reducers/orderReducer'
import adminuserReducer from './reducers/adminuserReducer';

const rootReducer = combineReducers({
    Product: productReducer,
    Cart: cartReducer,
    User: userReducer,
    Shipping: shippingReducer,
    Order: orderReducer,
    adminuser: adminuserReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') ) : []

const userinforFromStorage = localStorage.getItem('userinfor') ? JSON.parse(localStorage.getItem('userinfor') ) : null
const shippingFromStorage = localStorage.getItem('shippingaddress') ? JSON.parse(localStorage.getItem('shippingaddress')) : null
const paymentmethodFromStorage = localStorage.getItem('paymentmethod') ? JSON.parse(localStorage.getItem('paymentmethod')) : null
const orderFromStorage = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : null

const initialState = {
  Cart: {cart: cartItemsFromStorage},
  User: {user: userinforFromStorage},
  Shipping: {
    shippingaddress: shippingFromStorage,
    payment: paymentmethodFromStorage
  },
  Order: {order: orderFromStorage}
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;