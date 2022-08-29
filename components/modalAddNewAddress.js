import { Col, Form, Input, Modal, Row } from 'antd'
import React from 'react'
import { setVisibleAddNewAddress, postAddress } from '../storeRedux/actions/actionCreator'
import { useDispatch, useSelector } from 'react-redux'

const { TextArea } = Input

export default function ModalAddNewAddress() {

  const dispatch = useDispatch()
  const visibleAddNewAddress = useSelector(state => state.clientReducer.visibleAddNewAddress)

  const [formAddNewAddress] = Form.useForm()

  const handleCancel = () => {
    dispatch(setVisibleAddNewAddress(false))
  }

  const handleAddNew = () => {
    formAddNewAddress.validateFields(['city','postalCode','country','address'])
    .then(values => {
      const payload = {...values, isCustomer: true}
      dispatch(postAddress(payload))
      dispatch(setVisibleAddNewAddress(false))
    })
  }

  return (
    <Modal
      visible={visibleAddNewAddress}
      onCancel={() => handleCancel()}
      onOk={() => handleAddNew()}
      title="Add New Address"
      width={800}
      zIndex={1001}
    >
      <Form
        name="add_new_address"
        onFinish={handleAddNew}
        form={formAddNewAddress}
        layout="vertical"
      >
        <Row gutter={[8,8]}>
          <Col span={12} xs={24} sm={24} md={12}>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please input your City!' }]}
              label="City"
            >
              <Input
                style={borderRadiusInput}
                placeholder="Input City"
              />
            </Form.Item>
            <Form.Item
              name="postalCode"
              rules={[{ required: true, message: 'Please input your Postal Code!' }]}
              label="Postal Code"
            >
              <Input
                style={borderRadiusInput}
                placeholder="Input Postal Code"
              />
            </Form.Item>
          </Col>
          <Col span={12} xs={24} sm={24} md={12}>
            <Form.Item
              name="country"
              rules={[{ required: true, message: 'Please input your Country!' }]}
              label="Country"
            >
              <Input
                style={borderRadiusInput}
                placeholder="Input Country"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: 'Please input your Address!' }]}
              label="Address"
            >
              <TextArea
                style={borderRadiusInput}
                placeholder="Input Address"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

const borderRadiusInput = {
  borderRadius: '5px'
}