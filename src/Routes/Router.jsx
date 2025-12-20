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
import TicketDetails from '../Pages/TicketDetails/TicketDetails'
import UserProfile from '../Components/Dashboard/User/UserProfile/UserProfile'
import DashboardHome from '../Components/Dashboard/DashboardHome'
import BookedTickets from '../Components/Dashboard/User/BookedTickets/BookedTickets'
import AdminProfile from '../Components/Dashboard/Admin/AdminProfile/AdminProfile'
import ManageTickets from '../Components/Dashboard/Admin/ManageTickets/ManageTickets'
import AdvertiseTickets from '../Components/Dashboard/Admin/AdvertiseTickets/AdvertiseTickets'
import ManageUsers from '../Components/Dashboard/Admin/ManageUsers/ManageUsers'
import TickstDetailsAdmin from '../Components/Dashboard/Admin/TickstDetailsAdmin/TickstDetailsAdmin'
import VendorProfile from '../Components/Dashboard/Vendor/VendorProfile/VendorProfile'
import VendorAddedTickets from '../Components/Dashboard/Vendor/VendorAddedTickets/VendorAddedTickets'
import RequestedBookings from '../Components/Dashboard/Vendor/RequestedBookings/RequestedBookings'
import RevenueOverview from '../Components/Dashboard/Vendor/RevenueOverview/RevenueOverview'
import AddTicket from '../Components/Dashboard/Vendor/AddTicket/AddTicket'
import PaymentSuccess from '../Components/Dashboard/User/BookedTickets/PaymentSuccess'
import PaymentCancelled from '../Components/Dashboard/User/BookedTickets/PaymentCancelled'
import TransactionHistory from '../Components/Dashboard/User/TransactionHistory/TransactionHistory'
import EditTicket from '../Components/Dashboard/Vendor/EditTicket/EditTicket'
import Error404 from '../Pages/Error404/Error404'

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
        path: 'advertise-tickets',
        Component: AdvertiseTickets,
      },
      {
        path: 'ticket-details-admin/:id',
        Component: TickstDetailsAdmin,
      },
      {
        path: 'vendor-profile',
        Component: VendorProfile,
      },
      {
        path: 'add-ticket',
        Component: AddTicket,
      },
      {
        path: 'added-tickets',
        Component: VendorAddedTickets,
      },
      {
        path: 'requested-bookings',
        Component: RequestedBookings,
      },
      {
        path: 'revenue-overview',
        Component: RevenueOverview,
      },
      {
        path: 'edit-ticket/:id',
        Component: EditTicket,
      },
    ],
  },
  {
    path: 'payment-success',
    Component: PaymentSuccess,
  },
  {
    path: 'payment-cancelled',
    Component: PaymentCancelled,
  },
  {
    path: '*',
    Component: Error404,
  },
])
