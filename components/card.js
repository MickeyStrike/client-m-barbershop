import React, { useState } from 'react'
import { Tooltip } from 'antd'
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons'
import styles from '../styles/card.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setVisibleDetailProduct,
  setVisibleLogin,
  getDetailMerchandise,
  postFavouriteProduct,
  postTransactionMerchandise
} from '../storeRedux/actions/actionCreator'
import Skeleton from 'react-loading-skeleton';
import ImageNext from 'next/image'

export default function CardComponent(props) {

  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.clientReducer.isLogin)

  const [imageHover, setImageHover] = useState(false)
  const [liHover1, setliHover1] = useState(false)
  const [liHover2, setliHover2] = useState(false)
  const [liHover3, setliHover3] = useState(false)
  const { name, price, sourceImage, id } = props

  const handleViewDetail = () => {
    if (isLogin) {
      dispatch(getDetailMerchandise(id))
      dispatch(setVisibleDetailProduct(true))
    } else {
      dispatch(setVisibleLogin(true))
    }
  }

  const handleShoppingCart = () => {
    if (isLogin) {
      // dispatch add transaction endpoint
      dispatch(postTransactionMerchandise({ salesAmount: 1, discount: 0, price, merchandiseId: id }))
    } else {
      dispatch(setVisibleLogin(true))
    }
  }

  const handleToWishList = () => {
    if (isLogin) {
      dispatch(postFavouriteProduct({merchandiseId: id}))
    } else {
      dispatch(setVisibleLogin(true))
    }
  }

  return (
    <div className={styles.customCard}>
      <div className={styles.containerImage} onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)}>
        {
          sourceImage ? 
            <div className={styles.hoverImage}>
              <ImageNext
                layout='responsive'
                width={imageHover ? 200 : 150}
                height={imageHover ? 200 : 150}
                src={sourceImage}
              />
            </div>
            :
            <Skeleton width={150} height={150} className={styles.hoverImage} />
        }
        {
          imageHover && sourceImage ?
          <ul style={{ position: 'absolute', listStyleType: 'none', display: 'flex', background: 'rgb(255 255 255 / 69%)', bottom: '30%' }}>
            <li style={{ marginRight: 8 }} onClick={() => handleShoppingCart()}>
              <Tooltip title="Add To Cart">
                <ShoppingCartOutlined 
                  style={liHover1 ? styleCustomIconHover : styleCustomIcon}
                  onMouseEnter={() => setliHover1(true)}
                  onMouseLeave={() => setliHover1(false)}
                />
              </Tooltip>
            </li>
            <li style={{ marginRight: 8 }} onClick={() => handleViewDetail()}>
              <Tooltip title="See Detail">
                <EyeOutlined
                  style={liHover2 ? styleCustomIconHover : styleCustomIcon}
                  onMouseEnter={() => setliHover2(true)}
                  onMouseLeave={() => setliHover2(false)}
                />
              </Tooltip>
            </li>
            <li style={{ marginRight: 8 }} onClick={() => handleToWishList()}>
              <Tooltip title="Add To Wishlist">
                <HeartOutlined 
                  style={liHover3 ? styleCustomIconHover : styleCustomIcon}
                  onMouseEnter={() => setliHover3(true)}
                  onMouseLeave={() => setliHover3(false)}
                />
              </Tooltip>
            </li>
          </ul>
          :
          null
        }
      </div>
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span className={styles.customTitle}>{ name || <Skeleton width={100}/> }</span>
        <p className={styles.customPrice}>{price ? 'Rp ' : null}{price?.toLocaleString('id-ID') || <Skeleton width={100}/>}</p>
      </div>
    </div>
  )
}


const styleCustomIcon = {
  color: 'inherit',
  fontSize: 20,
  cursor: 'pointer'
}

const styleCustomIconHover = {
  backgroundColor: '#fcb800',
  borderRadius: 7,
  color: 'white',
  fontSize: 20,
  cursor: 'pointer'
}
