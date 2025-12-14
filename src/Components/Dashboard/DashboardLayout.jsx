import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../Loading/Loading'
import { FaFileCircleCheck, FaRegCircleCheck } from 'react-icons/fa6'
import { NavLink, Outlet } from 'react-router'
import { HiHome } from 'react-icons/hi2'
import useAxios from '../../Hooks/useAxios'
import { FaHistory, FaUserCircle } from 'react-icons/fa'
import { HiTicket } from 'react-icons/hi2'

const DashboardLayout = () => {
  const { user, loading } = use(AuthContext)
  const [showLoading, setShowLoading] = useState(true)

  const [users, setUsers] = useState([])
  const instance = useAxios()

  useEffect(() => {
    instance.get('/users').then((res) => {
      setUsers(res.data)
    })
  })
  const fltUser = users.find((u) => u.userEmail === user.email)

  // console.log(fltUser?.role)

  // console.log(users)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading || showLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}

          {fltUser?.role === 'user' && (
            <ul className="menu w-full grow">
              {/* List item */}

              <li className="dash-nav">
                <NavLink
                  to={'/'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home Page"
                >
                  {/* Home icon */}
                  <HiHome />
                  <span className="is-drawer-close:hidden">Home Page</span>
                </NavLink>
              </li>

              {/* List item */}
              <li className="dash-nav">
                <NavLink
                  to={'/dashboard/user-profile'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="User Profile"
                >
                  <FaUserCircle />
                  <span className="is-drawer-close:hidden">User Profile</span>
                </NavLink>
              </li>

              {/* List item */}
              <li className="dash-nav">
                <NavLink
                  to={'/dashboard/booked-tickets'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Booked Tickets"
                >
                  <FaFileCircleCheck />

                  <span className="is-drawer-close:hidden">My Booked Tickets</span>
                </NavLink>
              </li>

              {/* List item */}
              <li className="dash-nav">
                <NavLink
                  to={'/dashboard/transaction-history'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Transaction History"
                >
                  {/* Settings icon */}
                  {/* <GrHistory /> */}
                  <FaHistory />

                  <span className="is-drawer-close:hidden">Transaction History</span>
                </NavLink>
              </li>
            </ul>
          )}

          {fltUser?.role === 'admin' && (
            <ul className="menu w-full grow">
              {/* List item */}

              <li className="dash-nav">
                <NavLink
                  to={'/'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home Page"
                >
                  {/* Home icon */}
                  <HiHome />
                  <span className="is-drawer-close:hidden">Home Page</span>
                </NavLink>
              </li>

              {/* List item */}
              <li className="dash-nav">
                <NavLink
                  to={'/dashboard/admin-profile'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Admin Profile"
                >
                  <FaUserCircle />
                  <span className="is-drawer-close:hidden">Admin Profile</span>
                </NavLink>
              </li>

              {/* List item */}
              <li className="dash-nav">
                <NavLink
                  to={'/dashboard/manage-tickets'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Tickets"
                >
                  <HiTicket />

                  <span className="is-drawer-close:hidden">Manage Tickets</span>
                </NavLink>
              </li>

              {/* List item */}
              <li className="dash-nav">
                <NavLink
                  to={'/dashboard/advertise-history'}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Advertise History"
                >
                  <FaHistory />

                  <span className="is-drawer-close:hidden">Advertise History</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
