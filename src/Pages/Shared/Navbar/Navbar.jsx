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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
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
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleTheme()
          }}
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-base-200 transition-colors w-full text-left"
        >
          {theme === 'dark' ? (
            // Sun icon for dark mode (click to switch to light)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
          ) : (
            // Moon icon for light mode (click to switch to dark)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
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
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-base-300 hover:ring-[#086c52] transition-all"
                    src={user?.photoURL}
                    alt="profile"
                  />
                </div>

                <ul className="dropdown-content menu bg-base-100 rounded-lg w-56 p-2 shadow-lg border border-base-300 z-50 mt-2">
                  {/* User Info Section */}
                  <li className="px-3 py-2 mb-1">
                    <div className="flex items-center gap-3">
                     
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-base-content truncate">
                          {user?.displayName || 'User'}
                        </span>
                        <span className="text-xs text-base-content/60 truncate">
                          {user?.email || ''}
                        </span>
                      </div>
                    </div>
                  </li>

                  {/* Divider */}
                  <li>
                    <hr className="my-1 border-base-300" />
                  </li>

                  {/* Profile Link */}
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-200 transition-colors text-sm text-base-content"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Profile</span>
                    </Link>
                  </li>

                  {/* Dark Mode Toggle */}
                  <li>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTheme()
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-200 transition-colors text-sm text-base-content w-full text-left"
                    >
                      {theme === 'dark' ? (
                        // Sun icon for dark mode (click to switch to light)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
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
                      ) : (
                        // Moon icon for light mode (click to switch to dark)
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      )}
                      <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                    </button>
                  </li>

                  {/* Divider */}
                  <li>
                    <hr className="my-1 border-base-300" />
                  </li>

                  {/* Log Out Button */}
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500/10 hover:text-red-600 transition-colors text-sm text-base-content w-full text-left"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Log Out</span>
                    </button>
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
