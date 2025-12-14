import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../Loading/Loading'

const Profile = () => {
  const { loading } = use(AuthContext)
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading || showLoading) {
    return <Loading></Loading>
  }
  return (
    <div className="max-w-350 px-5 mx-auto">
      <p>This is user Profile</p>
    </div>
  )
}

export default Profile
