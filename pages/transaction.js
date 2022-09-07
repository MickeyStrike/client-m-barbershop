import React, { useEffect, useState } from 'react'
import LayoutCustom from '../components/layoutCustom'
import styles from '../styles/Home.module.css';
import stylesTransaction from '../styles/transaction.module.css';
import Head from 'next/head'
import { Card, Row, Col, Radio, Divider, Tag, Select, Button, Empty, Spin, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import {
  getDataTransaction,
  getAddress,
  postTransactionPayment,
  setNotification,
  updateTransactionPaymentId,
  getDataHistoryTransaction 
} from '../storeRedux/actions/actionCreator'
import CardTransaction from '../components/cardTransaction';
import ImageNext from 'next/image'
import Script from 'next/script'


const { Option } = Select

export default function Transaction() {

  const dispatch = useDispatch()

  const dataTransaction = useSelector(state => state.clientReducer.dataTransaction)
  const dataAddress = useSelector(state => state.clientReducer.dataAddress)
  const loadingTransaction = useSelector(state => state.clientReducer.loadingTransaction)
  const dataTransactionPayment = useSelector(state => state.clientReducer.dataTransactionPayment)
  const dataHistoryTransaction = useSelector(state => state.clientReducer.dataHistoryTransaction)

  const [address, setAddress] = useState(null)
  const [dataListItem, setDataListItem] = useState([])
  const [dataListAddress, setDataListAddress] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [columns] = useState([
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      width: 200,
      align: 'center',
      render: (_value, row, index) => (
        !row.Merchandise ?
          <ImageNext
            width={50}
            height={50}
            src="/assets/RS37761_GettyImages-506514876.jpg"
            key={index}
          />
        :
          <ImageNext
            width={50}
            height={50}
            src={row.Merchandise.imageUrl}
            key={index}
          />
      )
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      width: 200,
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'salesAmount',
      width: 200,
      align: 'center',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      width: 200,
      align: 'center',
      render: (value, _row, _index) => (
        <p>
          {value?.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
        </p>
      )
    },
    {
      title: 'Queue Number',
      dataIndex: 'queueNumber',
      width: 200,
      align: 'center',
    },
    {
      title: 'Queue Date',
      dataIndex: 'queueDate',
      width: 200,
      align: 'center',
    },
    {
      title: 'Transaction Time',
      dataIndex: 'transactionTime',
      width: 200,
      align: 'center',
    },
    {
      title: 'Status Payment',
      dataIndex: 'statusPayment',
      width: 200,
      align: 'center',
      fixed: 'right',
      render: (value, _row, _index) => (
        <Tag
          color={conditionTags(value)}
          key={value}
        >
          {value?.toUpperCase()}
        </Tag>
      )
    },
  ])

  const conditionTags = (value) => {
    if(value === 'settlement') return 'green'
    else if (value === 'settlement') return 'grey'
    else return 'volcano'
  }

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    dispatch(getDataHistoryTransaction(''))
    dispatch(getDataTransaction({ page: 1, limit: 10, search: 'checkout~false_AND_requestCheckout~false' }))
    dispatch(getAddress(''))
  }, [])

  useEffect(() => {
    if(dataTransactionPayment && Object.keys(dataTransactionPayment).length > 0) {
      handleSnapPayment(dataTransactionPayment.id)
    }
    console.log(dataTransactionPayment, 'payment')
  }, [dataTransactionPayment])

  useEffect(() => {
    if(dataTransaction && dataTransaction.data) {
      const tempListItem = dataTransaction.data.filter((dataFilter) => dataFilter.HaircutId === null)
      setDataListItem(tempListItem)
    }
  }, [dataTransaction])

  useEffect(() => {
    console.log(dataHistoryTransaction, 'history')
    if(dataHistoryTransaction && Array.isArray(dataHistoryTransaction)) {
      const tempDataSource = dataHistoryTransaction.map((dataMap, index) => {
        return {
          ...dataMap,
          key: index,
          statusPayment: dataMap?.Payment.transactionStatus,
          transactionTime: dataMap?.Payment.transactionTime,
          productName: dataMap.Merchandise ? dataMap.Merchandise.name : 'Haircut'
        }
      })
      setDataSource(tempDataSource)
    }
  }, [dataHistoryTransaction])

  useEffect(() => {
    if(dataAddress && Object.keys(dataAddress).length > 0) {
      setDataListAddress(dataAddress.data)
    }
  }, [dataAddress])

  useEffect(() => {
    if(selectedItems.length > 0) {
      const tempTotal = selectedItems.reduce((acc, obj) => { return acc + obj.totalPrice; }, 0);
      setTotalPrice(tempTotal)
    } else {
      setTotalPrice(0)
    }
    console.log(selectedItems, 'selected')
  }, [selectedItems])

  const handleSelectedItems = ({ id, isChecked, unit, itemPrice }) => {
    // id = id transaction
    if(isChecked) {
      console.log(isChecked, 'check ?')
      const tempSelected = [
        { 
          ...dataListItem.find((dataFind) => dataFind.id === id),
          totalPrice: unit * itemPrice,
          salesAmount: unit
        },
        ...selectedItems,
      ].filter((dataFilter, index, self) => 
        index === self.findIndex((t) =>
          t.id === dataFilter.id
        ));
      setSelectedItems(tempSelected)
    } else {
      const tempFilter = selectedItems.filter((dataFilter) => dataFilter.id !== id)
      setSelectedItems(tempFilter)
    }
  }

  const handleToPayment = () => {
    if(selectedItems.length > 0) {
      const findDataZero = selectedItems.find((dataFind) => dataFind.salesAmount < 1)
      const findSalesAmountGreaterThanStock = selectedItems.find((dataFind) => dataFind.salesAmount > dataFind.Merchandise.stockMerchandise)
      if(findDataZero) {
        dispatch(setNotification({
          type: 'error',
          message:'Error',
          description: `Unit ${findDataZero.Merchandise.name} can't less than 1`,
        }))
      } else if (findSalesAmountGreaterThanStock) {
        dispatch(setNotification({
          type: 'error',
          message:'Error',
          description: `${findSalesAmountGreaterThanStock.Merchandise.name} units available ${findSalesAmountGreaterThanStock.Merchandise.stockMerchandise}`,
        }))
      } else {
        dispatch(postTransactionPayment({ totalPrice, listItems: selectedItems }))
      }
    } else {
      dispatch(setNotification({
        type: 'error',
        message:'Error',
        description: 'Select data first to continue the payment',
      }))
    }
  }

  const updateTransaction = (result) => {
    const payload = {
      ...result,
      listId: selectedItems.map((dataMap) => dataMap.id),
      listTransaction: selectedItems
    }
    dispatch(updateTransactionPaymentId(payload))
    setSelectedItems([])
  }

  const handleSnapPayment = (token) => {
    window.snap.pay(token, {
      onSuccess: function(result){
        /* You may add your own implementation here */
        updateTransaction(result)
      },
      onPending: function(result){
        /* You may add your own implementation here */
        updateTransaction(result)
      },
      onError: function(result){
        /* You may add your own implementation here */
        updateTransaction(result)
      },
      onClose: function(){
        /* You may add your own implementation here */
        dispatch(setNotification({
          type: 'error',
          message:'Error',
          description: 'Your Payment Cancelled',
        }))
      }
    })
  }

  return (
    <LayoutCustom className={`${styles.container} ${styles.responsiveContainer}`}>
      <Head>
        <title>M BarberShop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <Script type="text/javascript"
          strategy='worker'
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-A1-Jamz55HdAcL8G"></Script>
      </Head>

      <div className={stylesTransaction.containerContent}>
        <h1 style={{ paddingTop: '4rem' }}>
          Transaction Details
        </h1>
        <Row gutter={[16, 8]}>
          <Col span={12} xs={24} sm={12}>
            <h2>List Order</h2>
            <Spin size='large' spinning={loadingTransaction}>
              <div style={{ overflowY: 'auto', maxHeight: 520, background: '#F3F4F5', padding: '0 10px' }}>
                {
                  dataListItem.length > 0 ?
                    dataListItem.map((dataMap, index) => {
                      return <div key={`${dataMap.Merchandise.name}${index}`} style={{ marginBottom: '5px', marginTop: '5px' }}>
                        <CardTransaction
                          imageUrl={dataMap.Merchandise.imageUrl}
                          itemName={dataMap.Merchandise.name}
                          itemPrice={dataMap.Merchandise.sellingPrice}
                          tagName={dataMap.Merchandise.Tag.name}
                          salesAmount={dataMap.salesAmount}
                          stockMerchandise={dataMap.Merchandise.stockMerchandise}
                          handleSelectedItems={handleSelectedItems}
                          indexItems={index}
                          idTransaction={dataMap.id}
                        />
                      </div>
                    })
                  :
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
              </div>
            </Spin>
          </Col>
          <Col span={12} xs={24} sm={12}>
            <h2>Your Invoice</h2>
            <Card>
              <h3>Available Payment</h3>
              <Row justify="space-around" align="middle">
                <Col span={6} xs={12} sm={12} md={12} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ImageNext
                    width={100}
                    height={80}
                    src="/assets/logo-bcapng-32694.png"
                  />
                </Col>
                <Col span={6} xs={12} sm={12} md={12} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ImageNext
                    width={100}
                    height={80}
                    src="/assets/logo-gopay.png"
                  />
                </Col>
                <Col span={6} xs={12} sm={12} md={12} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ImageNext
                    width={100}
                    height={35}
                    src="/assets/logo-qris.png"
                  />
                </Col>
                <Col span={6} xs={12} sm={12} md={12} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ImageNext
                    width={100}
                    height={45}
                    src="/assets/logo-shopee-pay.png"
                  />
                </Col>
              </Row>
              <Divider></Divider>
              <h3>Choose Place to Pickup</h3>
              <Row>
                <Col span={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Radio.Group onChange={(e) => setAddress(e.target.value)} value={address}>
                    <Radio value={null} style={{ alignItems: 'center' }}>
                      Store
                    </Radio>
                    <Radio value="my address" style={{ alignItems: 'center' }}>
                      My Address
                    </Radio>
                  </Radio.Group>
                </Col>
              </Row>
              {
                address === 'my address' ? (
                  <div style={{ marginLeft: 20, marginTop: 20 }}>
                    <label>Address</label>
                    <Select style={{ marginLeft: 20, width: 200 }}>
                      {dataListAddress.map((dataMap, index) => {
                        return <Option key={index} value={dataMap.id}>{dataMap.address}</Option>
                      })}
                    </Select>
                  </div>
                )
                :
                  null
              }
              <Divider></Divider>
              <h3>Summary Bill</h3>
              <Row style={{ marginTop: 20 }}>
                <Col span={12}>
                  <div>
                    <p>Subtotal</p>
                    <p>Discount</p>
                  </div>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div>
                    <p>{totalPrice || totalPrice === 0 ? totalPrice.toLocaleString('id', { style: 'currency', currency: 'IDR' }) : '0,00'}</p>
                    <p>{'Rp 0,00'}</p>
                  </div>
                </Col>
                <Col span={24}>
                  <Divider></Divider>
                </Col>
                <Col span={12}>
                  <p style={{ fontWeight: 'bold' }}>Total Price</p>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <p style={{ fontWeight: 'bold' }}>{totalPrice || totalPrice === 0 ? totalPrice.toLocaleString('id', { style: 'currency', currency: 'IDR' }) : '0,00'}</p>
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button style={{ width: '100%' }} type="primary" onClick={() => handleToPayment()}>Continue To Payment</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} xs={24} sm={24}>
            <h2>History Transaction</h2>
            <Table
              // scroll={{ x: 300 }}
              columns={columns}
              dataSource={dataSource}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 400 }}
            />
          </Col>
        </Row>
      </div>
    </LayoutCustom>
  )
}
