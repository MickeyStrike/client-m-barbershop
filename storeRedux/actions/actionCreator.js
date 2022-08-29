import axios from "axios";
import {
  SET_DATA_CLIENT,
  SET_INNER_WIDTH,
  SET_INNER_HEIGHT,
  SET_POST_LOGIN,
  SET_LIST_MERCHANDISE,
  SET_LIST_TAGS,
  SET_DETAIL_MERCHANDISE,
  SET_DATA_FAVOURITE_PRODUCT,
  SET_POST_FORGOT_PASSWORD,
  SET_POST_REGISTER,
  SET_VISIBLE_LOGIN,
  SET_VISIBLE_DETAIL_PRODUCT,
  SET_IS_LOGIN,
  SET_VISIBLE_PROFILE,
  SET_VISIBLE_DRAWER_MOBILE_MENU,
  SET_NOTIFICATION,
  SET_LOADING_MERCHANDISE,
  SET_LOADING_TRANSACTION,
  SET_DATA_TRANSACTION,
  SET_DATA_HISTORY_TRANSACTION,
  SET_LIST_BOOKING,
  SET_LOADING_BOOKING_LIST,
  SET_VISIBLE_ADD_NEW_ADDRESS,
  SET_VISIBLE_ADDRESS,
  SET_LOADING_ADDRESS,
  SET_DATA_ADDRESS,
  SET_TRANSACTION_PAYMENT,
  SET_TRANSACTION_PAYMENT_HAIRCUT
} from '../types/clientTypes'

const {BASE_URL} = process.env

export const postForgotPassword = (payload) => {
  console.log('post forgot password')
}

export const postRefreshToken = (payload) => {
  return dispatch => {
    axios.post(BASE_URL + '/refreshToken', payload)
    .then((responseToken) => {
      localStorage.setItem('accessToken', responseToken.data.accessToken)
      localStorage.setItem('refreshToken', responseToken.data.refreshToken)
      dispatch(setPostLogin(responseToken))
    })
    .catch((error) => {
      console.log(error.response, 'error rsponse')
      if(!error.response) {
        dispatch(setNotification({
          type: 'error',
          message:'Error',
          description: 'Network Error, Please Try again',
        }))
      } else if(error.response.status === 403) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(setIsLogin(false))
      } else {
        dispatch(setNotification({
          type: 'error',
          message:'Error',
          description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to Access This Content',
        }))
      }
    })
  }
}

export const postRegister = (payload) => {
  return dispatch => {
    axios.post(BASE_URL + '/register', payload)
      .then(() => {
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: 'Success Created'
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to Created',
          }))
        }
      })
  }
}

export const postLogin = (payload) => {
  return dispatch => {
    axios.post(BASE_URL + '/login', payload)
      .then((responseToken) => {
        localStorage.setItem('accessToken', responseToken.data.accessToken)
        localStorage.setItem('refreshToken', responseToken.data.refreshToken)
        dispatch(setPostLogin(responseToken))
        dispatch(setVisibleLogin(false))
        dispatch(setIsLogin(true))
        dispatch(getFavouriteProduct({ page: 1, limit: 10 }))
        dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: 'Success Login'
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to Login',
          }))
        }
      })
  }
}

export const getListTags = (search) => {
  return dispatch => {
    axios.get(BASE_URL + '/tags', { params: search })
      .then((response) => {
        console.log(response, 'response')
        dispatch(setListTags(response.data))
      })
      .catch((error) => {
        console.log(error, 'error')
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get tags',
          }))
        }
      })
  }
}

export const getListBookingList = (search) => {
  return dispatch => {
    dispatch(setLoadingBookingList(true))
    axios.get(BASE_URL + '/transactions/booking/list', {
      params: search, 
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => {
        dispatch(setListBooking(response.data))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get merchandise',
          }))
        }
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setLoadingBookingList(false))
        }, 5000);
      })
  }
}

export const getListMerchandise = (search) => {
  return dispatch => {
    dispatch(setLoadingMerchandise(true))
    axios.get(BASE_URL + '/merchandises', { params: search })
      .then((response) => {
        dispatch(setListMerchandise(response.data))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get merchandise',
          }))
        }
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setLoadingMerchandise(false))
        }, 5000);
      })
  }
}

export const getDetailMerchandise = (id) => {
  return dispatch => {
    axios.get(BASE_URL + `/merchandises/${id}`)
    .then((response) => {
      dispatch(setDetailMerchandise(response.data))
    })
    .catch((error) => {
      if(!error.response) {
        dispatch(setNotification({
          type: 'error',
          message:'Error',
          description: 'Network Error, Please Try again',
        }))
      } else {
        dispatch(setNotification({
          type: 'error',
          message:'Error',
          description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get merchandise',
        }))
      }
    })
  }
}

export const postFavouriteProduct = (payload) => {
  return dispatch => {
    axios.post(BASE_URL + '/favourite', payload, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then(() => {
        dispatch(getFavouriteProduct({ page: 1, limit: 10 }))
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: 'Success Add to Favourite'
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Add to Favourite',
          }))
        }
      })
  }
}

export const postTransactionMerchandise = (payload) => {
  return dispatch => {
    axios.post(BASE_URL + '/transaction/item', payload, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: response.data.message
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Add to Favourite',
          }))
        }
      })
  }
}

// transaction payment for merchandise
export const postTransactionPayment = (payload) => {
  return dispatch => {
    axios.post(BASE_URL + '/transaction/payment', payload, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        dispatch(setTransactionPayment(response.data))
        // dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
        // dispatch(setNotification({
        //   type: 'success',
        //   message: 'Success',
        //   description: response.data.message
        // }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Payment',
          }))
        }
      })
  }
}

// post transaction payment for haircut
// this endpoint will create new transaction and generate the payment
export const postTransactionHaircut = (payload) => {
  return dispatch => {
    axios.post(BASE_URL + '/transaction/haircut', payload, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        dispatch(setTransactionPaymentHaircut(response.data))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Create Transaction Haircut Payment',
          }))
        }
      })
  }
}
export const updateTransactionPaymentId = (payload) => {
  return dispatch => {
    axios.put(BASE_URL + '/transaction/update-payment', payload, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        // dispatch(setTransactionPayment(response.data))
        dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
        dispatch(getDataHistoryTransaction(''))
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: response.data.message
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Payment',
          }))
        }
      })
  }
}

export const updateTransactionPaymentHaircut = (payload) => {
  return dispatch => {
    axios.put(BASE_URL + '/transaction/update-payment/haircut', payload, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        // dispatch(setTransactionPayment(response.data))
        // dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
        if(response.data.message) {
          dispatch(setNotification({
            type: 'success',
            message: 'Success',
            description: response.data.message
          }))
        }
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Payment',
          }))
        }
      })
  }
}

export const getAddress = (search) => {
  return dispatch => {
    dispatch(setLoadingAddress(true))
    axios.get(BASE_URL + '/address/customer', { params: search, headers: { authorization: localStorage.getItem('accessToken') } })
      .then((response) => {
        dispatch(setDataAddress(response.data))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get merchandise',
          }))
        }
      })
      .finally(() => dispatch(setLoadingAddress(false)))
  }
}

export const postAddress = (payload) => {
  return dispatch => {
    dispatch(setLoadingAddress(true))
    axios.post(BASE_URL + '/address', payload, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        dispatch(getAddress(''))
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: response.data.message
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Add Address',
          }))
        }
      })
      .finally(() => dispatch(setLoadingAddress(false)))
  }
}

export const deleteAddress = (id) => {
  return dispatch => {
    dispatch(setLoadingAddress(true))
    axios.delete(BASE_URL + `/address/${id}`, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        dispatch(getAddress(''))
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: response.data.message
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Delete Address',
          }))
        }
      })
      .finally(() => dispatch(setLoadingAddress(false)))
  }
}

export const deleteTransaction = (id) => {
  return dispatch => {
    dispatch(setLoadingTransaction(true))
    axios.delete(BASE_URL + `/transaction/${id}`, {
      headers: { 
        authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    } })
      .then((response) => {
        dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
        dispatch(setNotification({
          type: 'success',
          message: 'Success',
          description: response.data.message
        }))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed Delete Address',
          }))
        }
      })
      .finally(() => dispatch(setLoadingTransaction(false)))
  }
}

export const getFavouriteProduct = (search) => {
  return dispatch => {
    dispatch(setLoadingMerchandise(true))
    axios.get(BASE_URL + '/favourite', { params: search, headers: { authorization: localStorage.getItem('accessToken') } })
      .then((response) => {
        dispatch(setDataFavouriteProduct(response.data))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get merchandise',
          }))
        }
      })
      .finally(() => dispatch(setLoadingMerchandise(false)))
  }
}

export const getDataTransaction = (search) => {
  return dispatch => {
    // dispatch(setLoadingMerchandise(true))
    axios.get(BASE_URL + '/transactions/merchandise', { params: search, headers: { authorization: localStorage.getItem('accessToken') } })
      .then((response) => {
        dispatch(setDataTransaction(response.data))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get merchandise',
          }))
        }
      })
      // .finally(() => dispatch(setLoadingMerchandise(false)))
  }
}

export const getDataHistoryTransaction = (search) => {
  return dispatch => {
    axios.get(BASE_URL + '/transactions/history', { params: search, headers: { authorization: localStorage.getItem('accessToken') } })
      .then((response) => {
        dispatch(setDataHistoryTransaction(response.data.data))
      })
      .catch((error) => {
        if(!error.response) {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: 'Network Error, Please Try again',
          }))
        } else {
          dispatch(setNotification({
            type: 'error',
            message:'Error',
            description: error.response.data.details ? `${error.response.data.details}` : error.response.data.message || 'Failed to get merchandise',
          }))
        }
      })
  }
}

export const setDataTransaction = (dataObject) => {
  return {
    type: SET_DATA_TRANSACTION,
    payload: dataObject
  }
}

export const setDataHistoryTransaction = (dataArray) => {
  return {
    type: SET_DATA_HISTORY_TRANSACTION,
    payload: dataArray
  }
}

export const setDataAddress = (dataObject) => {
  return {
    type: SET_DATA_ADDRESS,
    payload: dataObject
  }
}

export const setDataFavouriteProduct = (dataObject) => {
  return {
    type: SET_DATA_FAVOURITE_PRODUCT,
    payload: dataObject
  }
}

export const setNotification = (dataObject) => {
  return {
    type: SET_NOTIFICATION,
    payload: dataObject
  }
}

export const setPostLogin = (dataObject) => {
  return {
    type: SET_POST_LOGIN,
    payload: dataObject,
  };
}

export const setListTags = (dataObject) => {
  return {
    type: SET_LIST_TAGS,
    payload: dataObject,
  };
}

export const setListMerchandise = (dataObject) => {
  return {
    type: SET_LIST_MERCHANDISE,
    payload: dataObject,
  };
}

export const setLoadingAddress = (boolean) => {
  return {
    type: SET_LOADING_ADDRESS,
    payload: boolean,
  };
}

export const setLoadingMerchandise = (boolean) => {
  return {
    type: SET_LOADING_MERCHANDISE,
    payload: boolean,
  };
}

export const setTransactionPayment = (dataObject) => {
  return {
    type: SET_TRANSACTION_PAYMENT,
    payload: dataObject,
  };
}

export const setTransactionPaymentHaircut = (dataObject) => {
  return {
    type: SET_TRANSACTION_PAYMENT_HAIRCUT,
    payload: dataObject,
  };
}

export const setDetailMerchandise = (dataObject) => {
  return {
    type: SET_DETAIL_MERCHANDISE,
    payload: dataObject,
  };
}

export const setLoadingBookingList = (boolean) => {
  return {
    type: SET_LOADING_BOOKING_LIST,
    payload: boolean,
  };
}

export const setLoadingTransaction = (boolean) => {
  return {
    type: SET_LOADING_TRANSACTION,
    payload: boolean,
  };
}

export const setListBooking = (dataObject) => {
  return {
    type: SET_LIST_BOOKING,
    payload: dataObject,
  };
}

export const getDataClient = () => {
  const url = '/data-client'
  axios
    .get(BASE_URL + url)
    .then(({ data }) => {
      console.log(data)
      dispatch(setDataClient(data.data));
    })
    .catch((err) => console.log(err))
}

export const setDataClient = (dataObject) => {
  return {
    type: SET_DATA_CLIENT,
    payload: dataObject,
  };
}

export const setInnerWidth = (dataNumber) => {
  return {
    type: SET_INNER_WIDTH,
    payload: dataNumber
  }
}

export const setInnerHeight = (dataNumber) => {
  return {
    type: SET_INNER_HEIGHT,
    payload: dataNumber
  }

}
export const setIsLogin = (dataBoolean) => {
  return {
    type: SET_IS_LOGIN,
    payload: dataBoolean
  }
}

export const setVisibleLogin = (dataBoolean) => {
  return {
    type: SET_VISIBLE_LOGIN,
    payload: dataBoolean
  }
}

export const setVisibleDetailProduct = (dataBoolean) => {
  return {
    type: SET_VISIBLE_DETAIL_PRODUCT,
    payload: dataBoolean
  }
}

export const setVisibileProfile = (dataBoolean) => {
  return {
    type: SET_VISIBLE_PROFILE,
    payload: dataBoolean
  }
}

export const setVisibleDrawerMobileMenu = (dataBoolean) => {
  return {
    type: SET_VISIBLE_DRAWER_MOBILE_MENU,
    payload: dataBoolean
  }
}

export const setVisibleAddNewAddress = (dataBoolean) => {
  return {
    type: SET_VISIBLE_ADD_NEW_ADDRESS,
    payload: dataBoolean
  }
}

export const setVisibleAddress = (dataBoolean) => {
  return {
    type: SET_VISIBLE_ADDRESS,
    payload: dataBoolean
  }
}