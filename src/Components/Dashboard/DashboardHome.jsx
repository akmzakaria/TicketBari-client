import React, { use, useEffect, useState } from 'react'
import UserProfile from './User/UserProfile/UserProfile'
import { AuthContext } from '../../Context/AuthContext'
import useAxios from '../../Hooks/useAxios'
import AdminProfile from './Admin/AdminProfile/AdminProfile'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import VendorProfile from './Vendor/VendorProfile/VendorProfile'

const DashboardHome = () => {
  const { user } = use(AuthContext)
  const [users, setUsers] = useState([])
  const instance = useAxiosSecure()

  useEffect(() => {
    instance.get('/users').then((res) => {
      setUsers(res.data)
    })
  })
  const fltUser = users.find((u) => u.userEmail === user.email)

  if (fltUser?.role === 'user') {
    return <UserProfile></UserProfile>
  }

  if (fltUser?.role === 'vendor') {
    return <VendorProfile></VendorProfile>
  }

  if (fltUser?.role === 'admin') {
    return <AdminProfile></AdminProfile>
  }
}

export default DashboardHome
