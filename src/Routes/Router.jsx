import { createBrowserRouter } from 'react-router'
import RootLayout from '../Layouts/RootLayout'
import Home from '../Pages/Home/Home'
import AllTickets from '../Components/AllTickets/AllTickets'
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register'

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
        element: <AllTickets></AllTickets>,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ],
  },
])
