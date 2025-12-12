import React from 'react'
// import Logo from '../../../Components/Logo/Logo'
import { Link, NavLink } from 'react-router'
import { FaCircleArrowRight } from 'react-icons/fa6'
import { useScrollDirection } from './useScrollDir'
import Logo from '../../../Components/Logo/Logo'

const Navbar = () => {
  //   const { user, logOut } = useAuth()

  //   const handleLogOut = () => {
  //     logOut()
  //       .then(() => {
  //         // console.log(result.user)
  //       })
  //       .catch(() => {
  //         // console.log(err)
  //       })
  //   }

  //   const user = true
  const user = false

  const direction = useScrollDirection()

  const links = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/all-tickets'}>All Tickets</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={'/dashboard'}>Dashboard</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to={'/aboutus'}>About Us</NavLink>
      </li>
    </>
  )

  return (
    <div
      className={`shadow sticky top-0 z-50
      transition-transform duration-300 ${
        direction === 'down' ? '-translate-y-full' : 'translate-y-0'
      } `}
    >
      <div className={` navbar bg-base-100 max-w-11/12 mx-auto  `}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <span className="btn btn-ghost text-xl">
            <Logo></Logo>
          </span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            // profile logo
            <div className="dropdown dropdown-center">
              <div
                className="tooltip tooltip-bottom"
                tabIndex={0}
                role="button"
                data-tip="User Name"
              >
                <img className="w-10 h-10 object-cover  rounded-full" src={user?.photoURL} />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-50 w-35 p-2 shadow-sm"
              >
                <li>
                  <Link to={'/profile'}>Profile</Link>
                </li>
                <li>
                  <Link>Log Out</Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to={'/login'}
                className="btn text-[.8rem] md:text-[1rem] btn-sm md:btn-md rounded-lg mr-2"
              >
                Sign In
              </Link>

              <Link
                to={'/register'}
                className="btn text-[.8rem] md:text-[1rem] btn-sm md:btn-md rounded-lg mr-2 md:mr-3"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
