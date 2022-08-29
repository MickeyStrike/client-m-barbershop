import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Row, Col, notification } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import {
  postLogin,
  postRegister,
  postForgotPassword,
  setVisibleLogin,
  setNotification
} from '../storeRedux/actions/actionCreator'

export default function LoginModal(props) {

  const visibleLogin = useSelector(state => state.clientReducer.visibleLogin)

  const [section, setSection] = useState('Login') // Login / Register / Forgot Password
  const [formLogin] = Form.useForm()
  const [formRegister] = Form.useForm()
  const [formForgotPassword] = Form.useForm()

  const dispatch = useDispatch()
  const notifRedux = useSelector(state => state.clientReducer.notifRedux)


  useEffect(() => {
    console.log(notifRedux, 'reducer')
    if(notifRedux && Object.keys(notifRedux).length > 0) {
      notification[notifRedux.type](
        {
          message: notifRedux.message,
          description: notifRedux.description
        })
      dispatch(setNotification({}))
    }
  }, [notifRedux])

  const handleCancelModalLogin = () => {
    dispatch(setVisibleLogin(false))
  }

  const handleLogin = (values) => {
    dispatch(postLogin(values))
  };

  const handleRegister = (values) => {
    dispatch(postRegister(values))
    formRegister.resetFields()
    console.log('Received values of form: ', values)
  }

  const handleForgotPassword = (value) => {
    dispatch(postForgotPassword(values))
    formForgotPassword.resetFields()
    console.log('Received value of form: ', value)
  }

  return (
    <Modal
      visible={visibleLogin}
      onCancel={handleCancelModalLogin}
      footer={false}
      closable={false}
    >
      <div style={{ overflow: 'hidden' }}>
        {
          section === 'Login' ?
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={cardTitle}>Welcome Back!</div>
                <div style={cardDescription}>Please sign in to keep connected with us! Have a nice day! :)</div>
              </div>
              <Form
                name="normal_login"
                onFinish={handleLogin}
                form={formLogin}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input style={borderRadiusInput} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                  style={{ marginBottom: '0.5rem' }}
                >
                  <Input
                    style={borderRadiusInput}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span
                      style={{ color: '#096dd9', cursor: 'pointer' }} 
                      onClick={() => {
                        formRegister.resetFields();
                        setSection('Register')
                      }}
                    >
                      Register Account
                    </span>
                    <span
                      style={{ color: '#096dd9', cursor: 'pointer' }}
                      onClick={() => {
                        formForgotPassword.resetFields();
                        setSection('Forgot Password')
                      }}
                    >
                      Forgot Password
                    </span>
                  </div>
                  <Button type="primary" htmlType="submit" style={styleButtonLogin}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          :
          section === 'Register' ?
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={cardTitle}>Register Account!</div>
                <div style={cardDescription}>Please register to keep connected with us! :)</div>
              </div>
              <Form
                name="normal_register"
                onFinish={handleRegister}
                layout="vertical"
                form={formRegister}
              >
                <Row style={{ marginBottom: '0.5rem' }}>
                  <Col xs={24} sm={24} md={11} lg={11} style={{ marginRight: '1rem' }}>
                    <Form.Item
                      name="firstName"
                      rules={[{ required: true, message: 'Please input your First Name!' }]}
                      label="First Name"
                    >
                      <Input
                      style={borderRadiusInput}
                      placeholder="Input your firstname!"
                      />
                    </Form.Item>
                    <Form.Item
                      name="lastName"
                      rules={[{ required: true, message: 'Please input your Last Name!' }]}
                      label="Last Name"
                    >
                      <Input
                      style={borderRadiusInput}
                      placeholder="Input your lastname!"
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[{ required: true, message: 'Please input your Email!' }]}
                      label="Email"
                    >
                      <Input
                      style={borderRadiusInput}
                      placeholder="Input your email!"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                    label="Username"
                  >
                    <Input
                    style={borderRadiusInput}
                    placeholder="Input your username!"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input
                      style={borderRadiusInput}
                      type="password"
                      placeholder="Input your password!"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
                  >
                    <Input
                      style={borderRadiusInput}
                      type="password"
                      placeholder="Input confirm your password!"
                    />
                  </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                    <span
                      style={{ color: '#096dd9', cursor: 'pointer' }}
                      onClick={() => {
                        formLogin.resetFields();
                        setSection('Login');
                      }}
                    >
                        Login Account
                    </span>
                  </div>
                  <Button type="primary" htmlType="submit" style={styleButtonLogin}>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          :
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={cardTitle}>Forgot Password?</div>
              <div style={cardDescription}>Enter your email, our system directly send you a new password!</div>
            </div>
            <Form
              name="normal_forgot_password"
              onFinish={handleForgotPassword}
              form={formForgotPassword}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Username!' }]}
                style={{ marginBottom: '0.5rem' }}
              >
                <Input style={borderRadiusInput} prefix={<MailOutlined />} placeholder="Input your email!" />
              </Form.Item>
              <Form.Item>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                  <span
                    style={{ color: '#096dd9', cursor: 'pointer' }}
                    onClick={() => {
                      formLogin.resetFields();
                      setSection('Login')
                    }}
                  >
                      Login Account
                  </span>
                </div>
                <Button type="primary" htmlType="submit" style={styleButtonLogin}>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        }
      </div>
    </Modal>
  )
}

const cardTitle = {
  fontWeight: 'bold',
  fontSize: '2rem',
}

const cardDescription = {
  fontSize: '1rem'
}

const styleButtonLogin = {
  width: '100%',
  borderRadius: '8px'
}

const borderRadiusInput = {
  borderRadius: '5px'
}
