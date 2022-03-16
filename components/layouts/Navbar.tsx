import Link from 'next/link'
import React from 'react'

const Navbar: React.FC = ({ children }) => {
  return (
    <div className="flex flex-row">
      <ul>
        <li>
          <Link href="/">
            <a>Range Selector</a>
          </Link>
        </li>
        <li>
          <Link href="/suite/1">
            <a>Suite Date Selector</a>
          </Link>
        </li>
        <li>
          <Link href="/simple-calendar">
            <a>Simple Calendar</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
