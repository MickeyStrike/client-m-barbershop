import React from 'react'
import { Avatar } from 'antd'
import { LogoutOutlined, DatabaseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  setIsLogin,
  setVisibileProfile,
  setVisibleAddress,
  getAddress
} from '../storeRedux/actions/actionCreator'

export default function Profile({ style }) {

  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(setIsLogin(false))
    dispatch(setVisibileProfile(false))
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const handleAddress = () => {
    dispatch(setVisibleAddress(true))
    dispatch(getAddress(''))
  }

  return (
    <div style={{...style, ...customContainerProfile}}>
      <div style={customProfileBody}>
        <div style={customRow}>
          <div style={{ margin: 10, ...customCol, ...grow1 }}>
            <Avatar
              shape="square"
              size="large"
              style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }}
            >
              IM
            </Avatar>
          </div>
          <div style={{ margin: 10, alignItems: 'normal', ...customCol, ...grow8 }}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '20px', ...customEllipsis }}>
                Irfan Maulana
              </p>
            </div>
            <div>
              <p style={{ margin: 0, marginTop: '2px', ...customEllipsis }}>
                irfanmaulana281299@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div style={{ justifyContent: 'space-between', ...customRow }}>
          <div style={{ margin: '5px', cursor: 'pointer' }} onClick={() => handleAddress()}>
            <DatabaseOutlined /> Your Address
          </div>
          <div style={{ margin: '5px', cursor: 'pointer' }} onClick={() => signOut()}>
            <LogoutOutlined /> Logout
          </div>
        </div>
      </div>
    </div>
  )
}

const customRow = {
  display: 'flex',
  flexDirection: 'row',
}

const customEllipsis = {
  whiteSpace: 'nowrap',
  width: '200px', 
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const customCol = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}

const grow1 = {
  flexGrow: 1,
}

const grow8 = {
  flexGrow: 8,
}

const customProfileTitle = {
  borderBottom: '1px black solid',
  padding: '10px',
  minHeight: '2rem',
}

const customContainerProfile = {
  // background: '#e8e8e8',
  background: '#fff',
  borderRadius: '2px',
  zIndex: '1000',
  maxWidth: '20rem',
  minHeight: '2rem',
  margin: '0',
  boxShadow: '2px -9px 58px -6px rgba(0,0,0,0.56)',
  WebkitBoxShadow: '2px -9px 58px -6px rgba(0,0,0,0.56)',
  MozBoxShadow: '2px -9px 58px -6px rgba(0,0,0,0.56)',
  // boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15) !important',
  // webkitBoxShadow: '0 0.5rem 1rem rgba(0,0,0,.15) !important',
  // mozBoxShadow: '0 0.5rem 1rem rgba(0,0,0,.15) !important',
  position: 'fixed',
  inset: '3rem 8rem auto auto',
  // transform: 'translate(-130px, 36px)',
  float: 'right',
}

const customProfileBody = {
  padding: '10px',
  maxWidth: '20rem',
}