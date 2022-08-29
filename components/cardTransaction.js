import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Checkbox, Avatar, Input, Tooltip, Tag, InputNumber, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import stylesTransaction from '../styles/transaction.module.css';
import { deleteTransaction } from '../storeRedux/actions/actionCreator'
import ImageNext from 'next/image'

const { confirm } = Modal

export default function CardTransaction({ itemName, itemPrice, imageUrl, tagName, salesAmount, stockMerchandise, handleSelectedItems, indexItems, idTransaction }) {
  
  const dispatch = useDispatch()
  const innerWidth = useSelector(state => state.clientReducer.innerWidth)
  const [unit, setUnit] = useState(0)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if(salesAmount || salesAmount === 0) {
      setUnit(Number(salesAmount))
    }
  }, [salesAmount])

  useEffect(() => {
    if(checked) {
      handleCheckbox(undefined)
    }
  }, [unit, checked])

  const onChange = value => {
    setUnit(Number(value))
  };

  const formatNumber = (value) => {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? '.' + list[1] : ''}`;
  }

  const checkValue = () => {
    return unit > 0 ? formatNumber(unit) : '0'
  }

  const title = unit > 0 ? (<span className="numeric-input-title">{checkValue()}</span>) : ('0');

  const handleCheckbox = (e) => {
    if(e !== undefined) {
      setChecked(e.target.checked)
    }
    handleSelectedItems({ id: idTransaction, isChecked: e !== undefined ? e.target.checked : checked, unit, itemPrice })
  }

  const handleDeleteTransaction = () => {
    confirm({
      zIndex: 1151,
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, the item will directly deleted',
      onOk() {
        handleSelectedItems({ id: idTransaction, isChecked: false, unit, itemPrice })
        dispatch(deleteTransaction(idTransaction))
      },
      onCancel() {},
    })
  }

    // mobile
  if(innerWidth < 791) {
    return (
      <Card style={{ border: 'none' }}>
        <Row gutter={[16,16]}>
          <Col span={4} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Checkbox
              checked={checked}
              onChange={handleCheckbox}
            />
          </Col>
          <Col span={16}>
            {/* <img src={imageUrl} alt="not found" height="70" /> */}
            <ImageNext src={imageUrl} height={70} width={70} />
            <p className={stylesTransaction.titleCard}>{itemName}</p>
            <p className={stylesTransaction.priceCard}>{itemPrice.toLocaleString('id', { style: 'currency', currency: 'IDR' })}</p>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
              <Tooltip
                trigger={['focus']}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
              >
                <InputNumber
                  style={{ width: '50%', textAlign: 'center' }}
                  onChange={onChange}
                  value={unit}
                  max={stockMerchandise || 0}
                  min={0}
                  bordered={false}
                  controls={false}
                  addonAfter={<PlusOutlined onClick={() => setUnit(Number(unit) > 0 && Number(unit) < stockMerchandise ? Number(unit) + 1 : stockMerchandise)} />}
                  addonBefore={<MinusOutlined onClick={() => setUnit(Number(unit) > 0 ? Number(unit) - 1 : 0)} />}
                />
                </Tooltip>
            </div>
          </Col>
          <Col span={4} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Tooltip title="Remove this item">
              <DeleteOutlined className={stylesTransaction.deleteCard} />
            </Tooltip>
          </Col>
        </Row>
      </Card>
    )
  } else {
    return (
      <Card style={{ border: 'none' }}>
        <Row>
          <Col span={4} style={{ alignItems: 'center', display: 'flex' }}>
            <Checkbox
              checked={checked}
              onChange={handleCheckbox}
            />
          </Col>
          <Col span={6} style={{ alignItems: 'center', display: 'flex' }}>
            <img src={imageUrl} alt="not found" height="70" />
          </Col>
          <Col span={12} xs={24} sm={12}>
            <Tag color="#2db7f5">{tagName}</Tag>
            <p className={stylesTransaction.titleCard}>{itemName}</p>
            <p className={stylesTransaction.priceCard}>{itemPrice.toLocaleString('id', { style: 'currency', currency: 'IDR' })}</p>
            <Tooltip
              trigger={['focus']}
              title={title}
              placement="top"
              overlayClassName="numeric-input"
            >
              <InputNumber
                onChange={onChange}
                value={unit}
                style={{ width: '40%', textAlign: 'center' }}
                max={stockMerchandise || 0}
                min={0}
                bordered={false}
                controls={false}
                addonAfter={<PlusOutlined onClick={() => setUnit(Number(unit) > 0 && Number(unit) < stockMerchandise ? Number(unit) + 1 : stockMerchandise)} />}
                addonBefore={<MinusOutlined onClick={() => setUnit(Number(unit) > 0 ? Number(unit) - 1 : 0)} />}
              />
            </Tooltip>
          </Col>
          <Col span={2} xs={24} sm={2} style={{ alignItems: 'center', display: 'flex' }}>
            <Tooltip title="Remove this item">
              <DeleteOutlined className={stylesTransaction.deleteCard} onClick={() => handleDeleteTransaction()} />
            </Tooltip>
          </Col>
        </Row>
      </Card>
    )
  }
}
