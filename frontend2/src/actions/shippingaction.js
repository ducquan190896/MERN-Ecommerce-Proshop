export const Getshippingaddress = (formdata) => (dispatch, getState) => {
    try {
        dispatch({
            type: 'get_shippingaddress',
            payload: formdata
        })
        localStorage.setItem('shippingaddress', JSON.stringify(formdata))
    } catch (err) {
        dispatch({
            type: 'error_shippingaddress'
        })
    }

}
export const Resetshippingaddress = () => (dispatch, getState) => {
   
        dispatch({
            type: 'reset_shippingaddress'
            
        })
        localStorage.removeItem('shippingaddress')
  

}
export const Getpayment = (paymentmethod) => (dispatch) => {
    try {
        dispatch({
            type:'get_payment',
            payload: paymentmethod
        })
        localStorage.setItem('paymentmethod', JSON.stringify(paymentmethod))

    } catch (err) {
        dispatch({
            type: 'error_payment'
        })
    }
}
export const Resetpayment = () => (dispatch, getState) => {
   
    dispatch({
        type: 'reset_payment'
        
    })
    localStorage.removeItem('paymentmethod')


}