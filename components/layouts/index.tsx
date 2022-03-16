import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="px-4">{children}</main>
      <Footer />
    </>
  )
}
Footer
export default Layout
