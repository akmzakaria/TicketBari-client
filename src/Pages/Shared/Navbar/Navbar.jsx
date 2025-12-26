import React, { use, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import { useScrollDirection } from './useScrollDir'
import Logo from '../../../Components/Logo/Logo'
import { AuthContext } from '../../../Context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logOut } = use(AuthContext)
  const direction = useScrollDirection()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // disable background scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : 'auto'
  }, [isDrawerOpen])

  const handleToggle = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light')
  }

  const handleLogOut = () => {
    logOut()
    toast.success('Logged Out successfully!', { position: 'top-center' })
    setIsDrawerOpen(false)
  }

  const links = (
    <>
      <li className="nav">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav">
        <NavLink to="/all-tickets">Tickets</NavLink>
      </li>

      {user && (
        <li className="nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}

      <li className="nav">
        <NavLink to="/aboutUs">About Us</NavLink>
      </li>
      <li className="nav">
        <NavLink to="/contactUs">Contact Us</NavLink>
      </li>
      <li className="darkmode  md:hidden">
        <label className="flex items-center">
          <span>Dark mode</span>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={handleToggle}
            className="toggle toggle-sm"
          />
        </label>
      </li>
    </>
  )

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div
        className={`shadow bg-base-100 sticky top-0 z-50 transition-transform duration-300 ${
          direction === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="navbar max-w-[95vw] md:max-w-350 mx-auto">
          {/* LEFT */}
          <div className="navbar-start">
            <button onClick={() => setIsDrawerOpen(true)} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <span className="btn btn-ghost text-xl">
              <Logo />
            </span>
          </div>

          {/* CENTER (DESKTOP) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="tooltip tooltip-left md:tooltip-bottom"
                  data-tip={user?.displayName}
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.photoURL}
                    alt="profile"
                  />
                </div>

                <ul className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow z-50">
                  <li className="darkmode">
                    <Link to="/dashboard">Profile</Link>
                  </li>

                  <li className="darkmode">
                    <label className="flex justify-between items-center">
                      <span>Dark mode</span>
                      <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={handleToggle}
                        className="toggle toggle-sm"
                      />
                    </label>
                  </li>

                  <li className="darkmode">
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                {/* <label className="toggle mr-2">
                  <input type="checkbox" checked={theme === 'dark'} onChange={handleToggle} />
                </label> */}

                <label className=" cursor-pointer hidden md:flex  gap-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    type="checkbox"
                    value="synthwave"
                    checked={theme === 'dark'}
                    onChange={handleToggle}
                    className="toggle theme-controller"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>

                <Link to="/login" className="btn btn-sm md:btn-md mr-2">
                  Sign In
                </Link>

                <Link to="/register" className="btn btn-sm md:btn-md hidden md:flex">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-black/50 z-90 lg:hidden"
        />
      )}

      {/* ================= DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 z-100 transform transition-transform duration-300 lg:hidden
          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="btn btn-ghost absolute top-4 right-4"
        >
          ✕
        </button>

        <ul
          onClick={() => setIsDrawerOpen(false)}
          className="menu p-6 w-full mt-10 gap-2 bg-base-100"
        >
          {links}

          {!user && (
            <>
              <li className="nav">
                <NavLink to="/login">Sign In</NavLink>
              </li>
              <li className="nav">
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

export default Navbar
