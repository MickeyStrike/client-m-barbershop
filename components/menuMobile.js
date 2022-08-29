import React, { useState } from 'react'
import { Drawer, Menu } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleDrawerMobileMenu } from '../storeRedux/actions/actionCreator'
import { FormOutlined, InfoOutlined, HomeOutlined } from '@ant-design/icons';

// const { SubMenu } = Menu
// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export default function menuMobile() {

  const dispatch = useDispatch()
  
  const visibleDrawerMobileMenu = useSelector(state => state.clientReducer.visibleDrawerMobileMenu)

  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClose = () => {
    dispatch(setVisibleDrawerMobileMenu(false))
  }

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visibleDrawerMobileMenu}
      bodyStyle={{ padding: 0 }}
    >
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} theme="dark" style={{ height: '100%', background: 'black', color: 'white' }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
        <Menu.Item key="2" icon={<FormOutlined />}>Book Barber</Menu.Item>
        <Menu.Item key="3" icon={<InfoOutlined />}>About Us</Menu.Item>
      </Menu>
    </Drawer>
  )
}
