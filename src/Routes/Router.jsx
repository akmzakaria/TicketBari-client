import { createBrowserRouter } from 'react-router'
import RootLayout from '../Layouts/RootLayout'
import Home from '../Pages/Home/Home'
import AllTickets from '../Components/AllTickets/AllTickets'
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register'
import DashboardLayout from '../Components/Dashboard/DashboardLayout'
import Profile from '../Components/Profile/Profile'
import About from '../Components/About/About'
import PrivateRoute from './PrivateRoute'
import AddTicket from '../Pages/AddTicket/AddTicket'
import TicketDetails from '../Pages/TicketDetails/TicketDetails'
import UserProfile from '../Components/Dashboard/User/UserProfile/UserProfile'
import DashboardHome from '../Components/Dashboard/DashboardHome'
import BookedTickets from '../Components/Dashboard/User/BookedTickets/BookedTickets'
import TransactionHistory from '../Components/Dashboard/User/TransactionHistory/TransactionHistory'
import AdminProfile from '../Components/Dashboard/Admin/AdminProfile/AdminProfile'
import ManageTickets from '../Components/Dashboard/Admin/ManageTickets/ManageTickets'
import AdvertiseTickets from '../Components/Dashboard/Admin/AdvertiseTickets/AdvertiseTickets'
import ManageUsers from '../Components/Dashboard/Admin/ManageUsers/ManageUsers'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'all-tickets',
        element: (
          <PrivateRoute>
            <AllTickets></AllTickets>
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: 'aboutus',
        Component: About,
      },
      {
        path: 'add-ticket',
        element: (
          <PrivateRoute>
            <AddTicket></AddTicket>
          </PrivateRoute>
        ),
      },
      {
        path: 'ticket-details/:id',
        element: (
          <PrivateRoute>
            <TicketDetails></TicketDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: 'user-profile',
        Component: UserProfile,
      },
      {
        path: 'booked-tickets',
        Component: BookedTickets,
      },
      {
        path: 'transaction-history',
        Component: TransactionHistory,
      },
      {
        path: 'admin-profile',
        Component: AdminProfile,
      },
      {
        path: 'manage-tickets',
        Component: ManageTickets,
      },
      {
        path: 'manage-users',
        Component: ManageUsers,
      },
      {
        path: 'advertise-history',
        Component: AdvertiseTickets,
      },
    ],
  },
])
