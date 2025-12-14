import React, { use, useEffect, useState } from 'react'
import UserProfile from './User/UserProfile/UserProfile'
import { AuthContext } from '../../Context/AuthContext'
import useAxios from '../../Hooks/useAxios'
import AdminProfile from './Admin/AdminProfile/AdminProfile'

const DashboardHome = () => {
  const { user } = use(AuthContext)
  const [users, setUsers] = useState([])
  const instance = useAxios()

  useEffect(() => {
    instance.get('/users').then((res) => {
      setUsers(res.data)
    })
  })
  const fltUser = users.find((u) => u.userEmail === user.email)

  if (fltUser?.role === 'user') {
    return <UserProfile></UserProfile>
  }

  //   if(fltUser?.role==='vendor'){

  //       return <UserProfile></UserProfile>
  //   }

  if (fltUser?.role === 'admin') {
    return <AdminProfile></AdminProfile>
  }
}

export default DashboardHome
