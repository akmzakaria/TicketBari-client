import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../Loading/Loading'
import { FaFileCircleCheck, FaRegCircleCheck } from 'react-icons/fa6'
import { Link, NavLink, Outlet } from 'react-router'
import { HiHome, HiOutlineDocumentCheck, HiOutlineTicket } from 'react-icons/hi2'
import useAxios from '../../Hooks/useAxios'
import { FaHistory, FaUserCircle } from 'react-icons/fa'
import { HiTicket } from 'react-icons/hi2'
import { FaUserEdit } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { MdAddCard, MdOutlineAdminPanelSettings } from 'react-icons/md'
import { VscGitPullRequestNewChanges } from 'react-icons/vsc'
import { GrOverview, GrUserAdmin } from 'react-icons/gr'
import { MdBookmarkAdded } from 'react-icons/md'
import { MdOutlineBookmarkAdded } from 'react-icons/md'
import { LuHouse, LuHousePlug, LuHousePlus, LuUserRound, LuUserRoundPen } from 'react-icons/lu'
import { GoHistory } from 'react-icons/go'
import { AiOutlineFileDone } from 'react-icons/ai'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Footer from '../../Pages/Shared/Footer/Footer'
import Logo from '../Logo/Logo'
import { useQuery } from '@tanstack/react-query'

const DashboardLayout = () => {
  const { user, loading } = use(AuthContext)
  // const [showLoading, setShowLoading] = useState(true)

  // const [users, setUsers] = useState([])
  const instance = useAxiosSecure()

  // useEffect(() => {
  //   instance.get('/users').then((res) => {
  //     setUsers(res.data)
  //   })
  // }, [])

  const { isLoading, data: users = [] } = useQuery({
    queryKey: ['users', 'all-users'],
    queryFn: async () => {
      const res = await instance.get('/users')
      return res.data
    },
  })

  const fltUser = users.find((u) => u.userEmail === user.email)

  // console.log(fltUser?.role)

  // console.log(users)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowLoading(false)
  //   }, 2000)
  //   return () => clearTimeout(timer)
  // }, [])

  if (loading || isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-screen flex flex-col">
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
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}

            {fltUser?.role === 'user' && (
              <ul className="menu w-full grow">
                <Link className="ml-3 md:hidden" to={'/'}>
                  <Logo></Logo>
                </Link>

                {/* List item */}

                <li className="dash-nav">
                  <NavLink
                    to={'/'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Home Page"
                  >
                    {/* Home icon */}
                    {/* <HiHome /> */}
                    <LuHouse />
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
                    {/* <FaUserCircle /> */}
                    <LuUserRound />
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
                    {/* <FaFileCircleCheck /> */}
                    {/* <AiOutlineFileDone /> */}
                    <HiOutlineDocumentCheck />

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
                    {/* <FaHistory /> */}
                    <GoHistory />

                    <span className="is-drawer-close:hidden">Transaction History</span>
                  </NavLink>
                </li>
              </ul>
            )}

            {fltUser?.role === 'admin' && (
              <ul className="menu w-full grow">
                <Link className="ml-3 md:hidden" to={'/'}>
                  <Logo></Logo>
                </Link>

                {/* List item */}

                <li className="dash-nav">
                  <NavLink
                    to={'/'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Home Page"
                  >
                    {/* Home icon */}
                    {/* <HiHome /> */}
                    <LuHouse />

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
                    {/* <FaUserCircle /> */}
                    <GrUserAdmin />
                    {/* <MdOutlineAdminPanelSettings /> */}
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
                    {/* <HiTicket /> */}
                    <HiOutlineTicket />

                    <span className="is-drawer-close:hidden">Manage Tickets</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/manage-users'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                  >
                    {/* <FaUserEdit /> */}
                    <LuUserRoundPen />

                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/advertise-tickets'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Advertise Tickets"
                  >
                    {/* <FaHistory /> */}
                    <GoHistory />

                    <span className="is-drawer-close:hidden">Advertise Tickets</span>
                  </NavLink>
                </li>
              </ul>
            )}

            {fltUser?.role === 'vendor' && (
              <ul className="menu w-full grow">
                <Link className="ml-3 md:hidden" to={'/'}>
                  <Logo></Logo>
                </Link>

                {/* List item */}

                <li className="dash-nav">
                  <NavLink
                    to={'/'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Home Page"
                  >
                    {/* Home icon */}
                    {/* <HiHome /> */}
                    <LuHouse />
                    <span className="is-drawer-close:hidden">Home Page</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/vendor-profile'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Vendor Profile"
                  >
                    {/* <FaUserCircle /> */}
                    <LuUserRound />
                    <span className="is-drawer-close:hidden">Vendor Profile</span>
                  </NavLink>
                </li>

                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/add-ticket'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Ticket"
                  >
                    <MdAddCard />
                    <span className="is-drawer-close:hidden">Add Ticket</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/added-tickets'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Added Tickets"
                  >
                    {/* <MdBookmarkAdded /> */}
                    <MdOutlineBookmarkAdded className="text-[17px] -mx-[1.5px]" />

                    <span className="is-drawer-close:hidden">Added Tickets</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/requested-bookings'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Requested Bookings"
                  >
                    <VscGitPullRequestNewChanges />

                    <span className="is-drawer-close:hidden">Requested Bookings</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/revenue-overview'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Revenue Overview"
                  >
                    <GrOverview />

                    <span className="is-drawer-close:hidden">Revenue Overview</span>
                  </NavLink>
                </li>
              </ul>
            )}

            {fltUser?.role === 'fraud' && (
              <ul className="menu w-full grow">
                <Link className="ml-3 md:hidden" to={'/'}>
                  <Logo></Logo>
                </Link>

                {/* List item */}

                <li className="dash-nav">
                  <NavLink
                    to={'/'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Home Page"
                  >
                    {/* Home icon */}
                    {/* <HiHome /> */}
                    <LuHouse />
                    <span className="is-drawer-close:hidden">Home Page</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li className="dash-nav">
                  <NavLink
                    to={'/dashboard/vendor-profile'}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Vendor Profile"
                  >
                    {/* <FaUserCircle /> */}
                    <LuUserRound />
                    <span className="is-drawer-close:hidden">Vendor Profile</span>
                  </NavLink>
                </li>

                <li>
                  <button
                    disabled
                    className="is-drawer-close:tooltip dash-block text-black/40 hover:cursor-not-allowed is-drawer-close:tooltip-right"
                    data-tip="Add Ticket"
                  >
                    <MdAddCard />
                    <span className="is-drawer-close:hidden">Add Ticket</span>
                  </button>
                </li>

                {/* List item */}
                <li>
                  <button
                    disabled
                    className="is-drawer-close:tooltip dash-block hover:cursor-not-allowed text-black/40 is-drawer-close:tooltip-right"
                    data-tip="Added Tickets"
                  >
                    {/* <MdBookmarkAdded /> */}
                    <MdOutlineBookmarkAdded className="text-[17px] -mx-[1.5px]" />

                    <span className="is-drawer-close:hidden">Added Tickets</span>
                  </button>
                </li>

                {/* List item */}
                <li>
                  <button
                    disabled
                    className="is-drawer-close:tooltip dash-block hover:cursor-not-allowed text-black/40 is-drawer-close:tooltip-right"
                    data-tip="Requested Bookings"
                  >
                    <VscGitPullRequestNewChanges />

                    <span className="is-drawer-close:hidden">Requested Bookings</span>
                  </button>
                </li>

                {/* List item */}
                <li>
                  <button
                    disabled
                    className="is-drawer-close:tooltip dash-block hover:cursor-not-allowed is-drawer-close:tooltip-right text-black/40"
                    data-tip="Revenue Overview"
                  >
                    <GrOverview />

                    <span className="is-drawer-close:hidden ">Revenue Overview</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default DashboardLayout
