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
    <ul className="flex flex-row flex-wrap items-center justify-center p-4 shadow-sm sm:flex-row sm:space-x-4">
      {routes.map((route) => (
        <li key={route.path} className="inline-flex">
          <Link href={route.path}>
            <a className="my-2 whitespace-nowrap px-4 py-2 text-xs font-bold uppercase text-brand shadow-md">
              {route.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navbar
