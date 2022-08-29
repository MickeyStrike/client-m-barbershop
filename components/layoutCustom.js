import React, { useEffect } from 'react'
import Header from './header';
import Footer from './footer';
import MenuMobile from './menuMobile';
import Login from '../components/loginModal';
import Profile from '../components/profile'
import { useSelector, useDispatch } from 'react-redux'
import {
  setIsLogin,
  postRefreshToken,
  getFavouriteProduct,
  getDataTransaction
} from '../storeRedux/actions/actionCreator'
import jwtDecode from 'jwt-decode';
import ModalAddress from './modalAddress';
import ModalAddNewAddress from './modalAddNewAddress';

export default function Layout(props) {

  const dispatch = useDispatch()

  const visibleProfile = useSelector(state => state.clientReducer.visibleProfile)

  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
      const decode = jwtDecode(localStorage.getItem('accessToken'))
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const today = new Date()
      today.setDate(today.getDate())
      // if token expired
      if(decode.expiredDate < today.getTime()/1000) {
        dispatch(postRefreshToken({accessToken, refreshToken}))
      }

      console.log(decode, 'decode')
      dispatch(setIsLogin(true))
      dispatch(getFavouriteProduct({ page: 1, limit: 10 }))
      dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
    }
  }, [])

  return (
    <div>
      <Header/>
      <MenuMobile/>
      {props.children}
      <Login/>
      <Profile style={visibleProfile ? { display: '' } : { display: 'none' }} />
      <Footer/>
      <ModalAddress />
      <ModalAddNewAddress />
    </div>
  )
}
