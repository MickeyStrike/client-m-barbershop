import { Avatar } from 'antd'
import React from 'react'
import stylesBooking from '../styles/bookingbarber.module.css'
import Skeleton from 'react-loading-skeleton';
export default function CardBooking({ firstName, queueDate, initial }) {
  return (
    <div style={{ alignItems: 'center', alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
      {
        initial ?
        <Avatar style={{ backgroundColor: '#f56a00' }}>{initial}</Avatar>
        :
        <Skeleton style={{ borderRadius: '100%' }} width={32} height={32} />
      }
      <p className={stylesBooking['name-booking']} style={{ margin: 0 }}>{firstName || <Skeleton width={26} />}</p>
      <p className={stylesBooking['time-booking']} style={{ margin: 0 }}>{queueDate || <Skeleton width={52} />}</p>
    </div>
  )
}