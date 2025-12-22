import React, { use, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import { FaCircleArrowRight } from 'react-icons/fa6'
import { useScrollDirection } from './useScrollDir'
import Logo from '../../../Components/Logo/Logo'
import { AuthContext } from '../../../Context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logOut } = use(AuthContext)
  const direction = useScrollDirection()

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  )

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')

    document.querySelector('html').setAttribute('data-theme', localTheme)
  }, [theme])

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const links = (
    <>
      <li className="nav">
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li className="nav">
        <NavLink to={'/all-tickets'}>All Tickets</NavLink>
      </li>

      {user && (
        <>
          <li className="nav">
            <NavLink to={'/dashboard'}>Dashboard</NavLink>
          </li>
        </>
      )}

      <li className="nav">
        <NavLink to={'/aboutUs'}>About Us</NavLink>
      </li>
      <li className="nav">
        <NavLink to={'/contactUs'}>Contact Us</NavLink>
      </li>
    </>
  )

  const handleLogOut = () => {
    logOut()
    toast.success('Logged Out successfully!', {
      position: 'top-center',
    })
  }

  return (
    <div
      className={`shadow sticky top-0 z-50
      transition-transform duration-300 ${
        direction === 'down' ? '-translate-y-full' : 'translate-y-0'
      } `}
    >
      <div className="navbar bg-base-100 max-w-[95vw] md:max-w-350 mx-auto">
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
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-50 mt-3 w-40 p-2 shadow"
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
            <div className="dropdown dropdown-end">
              <div
                className="tooltip tooltip-left md:tooltip-bottom flex items-center"
                tabIndex={0}
                role="button"
                data-tip={user?.displayName}
              >
                <img
                  className="w-10 h-10 border border-[#086c52] object-cover rounded-full"
                  src={user?.photoURL}
                  alt="User Profile"
                />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-50 w-40 p-2 shadow-sm gap-1"
              >
                <li>
                  <Link to={'/dashboard'}>Profile</Link>
                </li>

                <li>
                  <label className="flex cursor-pointer gap-2 justify-between">
                    <span>Light/Dark</span>
                    <input
                      type="checkbox"
                      onChange={handleToggle}
                      checked={theme === 'dark'}
                      className="toggle toggle-sm theme-controller"
                    />
                  </label>
                </li>

                <li>
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              {/* toggle theme */}
              <label className="toggle text-base-content mr-2">
                <input
                  type="checkbox"
                  value="synthwave"
                  className="theme-controller"
                  onChange={handleToggle}
                  checked={theme === 'dark'}
                />

                <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </g>
                </svg>

                <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </g>
                </svg>
              </label>

              <Link
                to={'/login'}
                className="btn text-[.8rem] md:text-[1rem] hover:text-white  hover:bg-[#064e3b] btn-sm md:btn-md rounded-lg mr-2"
              >
                Sign In
              </Link>

              <Link
                to={'/register'}
                className="btn text-[.8rem] md:text-[1rem] hover:text-white  hover:bg-[#064e3b] btn-sm md:btn-md rounded-lg mr-2 md:mr-3 hidden md:flex"
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
