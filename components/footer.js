import React from 'react'
import styles from '../styles/footer.module.css'
export default function Footer() {
  return (
    <footer className={styles.customFooter}>
      <div style={{ display: 'flex' }}>
        <p style={{ color: 'white', margin: '0px 5px 0px 0px' }}>© 2021</p>
        <p style={{ color: 'rgb(255, 130, 47)', margin: 0 }}>M Barbershop</p>
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ color: 'white', margin: '0px 5px 0px 0px' }}>The Future of</p>
        <p style={{ color: 'rgb(255, 130, 47)', margin: 0 }}>BarberShop</p>
      </div>
    </footer>
  )
}
