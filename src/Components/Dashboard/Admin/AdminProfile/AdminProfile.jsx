import React, { use } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../Loading/Loading'

const AdminProfile = () => {
  const { user } = use(AuthContext)
  const instance = useAxiosSecure()

  const { isLoading, data: users = [] } = useQuery({
    queryKey: [user?.email, 'profile'],
    queryFn: async () => {
      const res = await instance.get(`/users?email=${user?.email}`)
      return res.data
    },
  })

  if (isLoading) {
    return <Loading />
  }

  const fltUser = users.find((u) => u.userEmail === user.email)

  if (!fltUser) {
    return <p className="text-center mt-10 text-red-600">User not found</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-xl">
        <div className="flex flex-col items-center">
          <img
            src={fltUser.photoURL || '/default-profile.png'}
            alt={fltUser.userName}
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-green-600"
          />
          <h2 className="text-2xl font-bold mb-2">{fltUser.userName}</h2>
          <p className="text-gray-600 mb-1">Email: {fltUser.userEmail}</p>
          <p className="text-gray-600">Role: {fltUser.role}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
          <ul className="text-gray-700 space-y-1">
            <li>
              <span className="font-semibold">Name:</span> {fltUser.userName}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {fltUser.userEmail}
            </li>
            <li>
              <span className="font-semibold">Role:</span> {fltUser.role}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
