import React, { useEffect, useState } from 'react'
import styles from '../styles/header.module.css'
import { HeartOutlined, ShoppingCartOutlined, UserOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setInnerWidth,
  setInnerHeight,
  setVisibleLogin,
  setVisibleDrawerMobileMenu,
  setVisibileProfile
} from '../storeRedux/actions/actionCreator'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {

  const dispatch = useDispatch()
  const router = useRouter()

  const [totalFavourite, setTotalFavourite] = useState(0)
  const [totalTransaction, setTotalTransaction] = useState(0)

  // data fav product
  const dataFavouriteProduct = useSelector(state => state.clientReducer.dataFavouriteProduct)
  const dataTransaction = useSelector(state => state.clientReducer.dataTransaction)

  const innerWidth = useSelector(state => state.clientReducer.innerWidth)
  const innerHeight = useSelector(state => state.clientReducer.innerHeight)
  const visibleProfile = useSelector(state => state.clientReducer.visibleProfile)
  const isLogin = useSelector(state => state.clientReducer.isLogin)

  // listener width & height
  const eventListener = () => {
    const listener = window.addEventListener('resize', (e) => {
      dispatch(setInnerWidth(e.target.innerWidth))
      dispatch(setInnerHeight(e.target.innerHeight))
    })

    window.removeEventListener('resize', listener)
  }

  useEffect(eventListener, [])

  useEffect(() => {
    if(innerWidth === 0 || innerHeight === 0) {
      dispatch(setInnerWidth(window.innerWidth))
      dispatch(setInnerHeight(window.innerHeight))
    }
  }, [])

  useEffect(() => {
    if(dataFavouriteProduct && Object.keys(dataFavouriteProduct).length > 0) {
      setTotalFavourite(dataFavouriteProduct.totalElement)
    }
  }, [dataFavouriteProduct])

  useEffect(() => {
    if(dataTransaction && Object.keys(dataTransaction).length > 0) {
      setTotalTransaction(dataTransaction.totalElement)
    }
  }, [dataTransaction])

  const handleProfile = () => {
    if (isLogin && !visibleProfile) {
      dispatch(setVisibileProfile(true))
    } else if (isLogin && visibleProfile) {
      dispatch(setVisibileProfile(false))
    }  else {
      dispatch(setVisibleLogin(true))
    }
  }

  const handleCart = () => {
    if (isLogin) {
      router.push('/transaction')
    }else {
      dispatch(setVisibleLogin(true))
    }
  }

  const handleFavourite = () => {
    if (isLogin) {
      router.push('/favourite')
    }else {
      dispatch(setVisibleLogin(true))
    }
  }

  return (
    <header className={styles.customHeader}>
      <div className={styles.customLogo}>
        M BarberShop
      </div>
      {
        innerWidth <= 790 ?
          null
            :
          (<ul className={styles.customUl}>
            <li className={styles.customLi}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.customLi}>
              <Link href="/bookingBarber">
                <a>Booking Barber</a>
              </Link>
            </li>
            <li className={styles.customLi}>
              <Link href="/merchandise">
                <a>Merchandise</a>
              </Link>
            </li>
          </ul>)
      }
      <div className={styles.customIconsHeader}>
        <ul className={styles.customUl}>
          <li className={styles.customIcon} style={{ display: 'block', float: 'left', marginRight: '2rem', cursor: 'pointer' }}>
            <Badge count={isLogin ? totalFavourite : 0} size="small">
              <HeartOutlined className={styles.customIcon} style={innerWidth <= 570 ? { fontSize: '15px' } : { fontSize: '20px' }} onClick={() => handleFavourite()} />
            </Badge>
          </li>
          <li className={styles.customIcon} style={{ display: 'block', float: 'left', marginRight: '2rem', cursor: 'pointer' }}>
            <Badge count={isLogin ? totalTransaction : 0} size="small">
              <ShoppingCartOutlined className={styles.customIcon} style={innerWidth <= 570 ? { fontSize: '15px' } : { fontSize: '20px' }} onClick={() => handleCart()} />
            </Badge>
          </li>
          <li className={styles.customIcon} style={{ display: 'block', float: 'left', marginRight: '2rem', cursor: 'pointer' }}>
            <UserOutlined className={styles.customIcon} style={innerWidth <= 570 ? { fontSize: '15px' } : { fontSize: '20px' }} onClick={() => handleProfile()}/>
          </li>
          {
            innerWidth <= 790 ?
            <li className={styles.customIcon} style={{ display: 'block', float: 'left', marginRight: '2rem', cursor: 'pointer' }} onClick={() => dispatch(setVisibleDrawerMobileMenu(true))}><MenuUnfoldOutlined style={innerWidth <= 570 ? { fontSize: '15px' } : { fontSize: '20px' }} rotate={180}/></li>
            :
            null
          }
        </ul>
      </div>
    </header>
  )
}
