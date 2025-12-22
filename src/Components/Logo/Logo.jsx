import React from 'react'
import logo1 from '/fav2.png'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to={'/'}>
      <div className="flex items-center gap-1">
        <img className="w-6 md:w-9" src={logo1} alt="" />
        <h3 className="text-xl font-bold">TicketGhor</h3>
      </div>
    </Link>
  )
}

export default Logo
