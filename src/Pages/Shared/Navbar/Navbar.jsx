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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const navLinkClasses = ({ isActive }) => `flex items-center gap-2 ${isActive ? 'active' : ''}`

  const handleLogOut = () => {
    logOut()
    toast.success('Logged Out successfully!', { position: 'top-center' })
    setIsDrawerOpen(false)
  }

  const links = (
    <>
      <li className="nav">
        <NavLink to="/" className={navLinkClasses}>
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
            <path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
          </svg>
          <span>Home</span>
        </NavLink>
      </li>
      <li className="nav">
        <NavLink to="/all-tickets" className={navLinkClasses}>
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
            <path d="M20.59 13.41 11 3.83a2 2 0 0 0-1.41-.59H4a2 2 0 0 0-2 2v5.59a2 2 0 0 0 .59 1.41l9.59 9.59a2 2 0 0 0 2.82 0l5.59-5.59a2 2 0 0 0 0-2.82z" />
            <circle cx="7.5" cy="7.5" r="1.5" />
          </svg>
          <span>Tickets</span>
        </NavLink>
      </li>

      {user && (
        <li className="nav">
          <NavLink to="/dashboard" className={navLinkClasses}>
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
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="10" width="7" height="11" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>Dashboard</span>
          </NavLink>
        </li>
      )}

      <li className="nav">
        <NavLink to="/aboutUs" className={navLinkClasses}>
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>About Us</span>
        </NavLink>
      </li>
      <li className="nav">
        <NavLink to="/contactUs" className={navLinkClasses}>
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Contact Us</span>
        </NavLink>
      </li>
      <li className="darkmode  md:hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleTheme()
          }}
          className="flex items-center gap-2 px-3 py-2 min-h-11 rounded-md hover:bg-base-200 transition-colors w-full text-left leading-none"
        >
          <span className="inline-flex items-center justify-center w-5 h-5 shrink-0">
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
          </span>
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

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="hidden md:inline-flex items-center justify-center mr-2 w-10 h-10 rounded-full border border-base-300 bg-base-100 hover:bg-base-200 transition-colors"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    // Sun icon (currently dark)
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
                  ) : (
                    // Moon icon (currently light)
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
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>

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
                <NavLink to="/login" className={navLinkClasses}>
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
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>Sign In</span>
                </NavLink>
              </li>
              <li className="nav">
                <NavLink to="/register" className={navLinkClasses}>
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  <span>Register</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

export default Navbar
