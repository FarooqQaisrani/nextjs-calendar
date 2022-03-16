import Link from 'next/link'
import React from 'react'

const Navbar: React.FC = () => {
  const routes = [
    {
      name: 'Range Selector',
      path: '/',
    },
    {
      name: 'Suite Date Selector',
      path: '/suite/1',
    },
    {
      name: 'Simple Calendar',
      path: '/simple-calendar',
    },
  ]
  return (
    <ul className="flex flex-row justify-center space-x-4  p-4">
      {routes.map((route) => (
        <li key={route.path}>
          <Link href={route.path}>
            <a className="px-4 py-2 font-bold uppercase text-brand shadow-md">
              {route.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navbar
