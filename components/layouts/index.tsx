import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
Footer
export default Layout
