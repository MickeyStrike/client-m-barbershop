import { Button, Dropdown, Menu, Modal, Table } from 'antd'
import { DownOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleAddress, setVisibleAddNewAddress, deleteAddress } from '../storeRedux/actions/actionCreator'

const { confirm } = Modal;

export default function ModalAddress() {

  const dispatch = useDispatch()
  const visibleAddress = useSelector(state => state.clientReducer.visibleAddress)
  const dataAddress = useSelector(state => state.clientReducer.dataAddress)
  const loadingAddress = useSelector(state => state.clientReducer.loadingAddress)

  const [columns] = useState([
    {
      title: 'Address',
      dataIndex: 'address',
      width: 200,
      align: 'center',
    },
    {
      title: 'City',
      dataIndex: 'city',
      width: 200,
      align: 'center',
    },
    {
      title: 'Postal Code',
      dataIndex: 'postalCode',
      width: 200,
      align: 'center',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      width: 150,
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      align: 'center',
      render: (_value, row, _index) => {
        const menuAction = () => (
          <>
            <Menu>
              <Menu.Item key="0" onClick={() => { deleteItem(row) }}>
                <DeleteOutlined style={{ marginRight: '4px' }} />Delete
              </Menu.Item>
            </Menu>
          </>
        )
        return {
          children: <Dropdown overlay={menuAction} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Click me <DownOutlined />
            </a>
          </Dropdown>
        }
      }
    },
  ])

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    if(dataAddress && Object.keys(dataAddress).length > 0) setDataSource(dataAddress.data)
  }, [dataAddress])

  const handleCancel = () => {
    dispatch(setVisibleAddress(false))
  }

  const handleAddNewAddress = () => {
    dispatch(setVisibleAddNewAddress(true))
  }

  const deleteItem = (row) => {
    confirm({
      zIndex: 1151,
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, the item will directly deleted',
      onOk() {
        dispatch(deleteAddress(row.id))
      },
    })
  }

  return (
    <Modal
      visible={visibleAddress}
      onCancel={() => handleCancel()}
      title="Your Address"
      width={800}
      footer={[
        <Button key="back" onClick={() => handleCancel()}>
          Cancel
        </Button>,
      ]}
    >
      <Button type='primary' style={{ marginBottom: '1rem' }} onClick={() => handleAddNewAddress()}>+ Add New Address</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loadingAddress}
      />
    </Modal>
  )
}
