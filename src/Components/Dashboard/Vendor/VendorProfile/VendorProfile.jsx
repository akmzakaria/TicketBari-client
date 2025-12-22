import React, { use } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import Loading from '../../../Loading/Loading'

const VendorProfile = () => {
  const { user, loading } = use(AuthContext)
  const instance = useAxiosSecure()

  const { isLoading, data: users = [] } = useQuery({
    queryKey: [user?.email, 'profile'],
    queryFn: async () => {
      const res = await instance.get(`/users?email=${user?.email}`)
      return res.data
    },
  })

  if (isLoading || loading) {
    return <Loading />
  }

  const fltUser = users.find((u) => u.userEmail === user.email)

  if (!fltUser) {
    return <p className="text-center mt-10 text-red-600">User not found!</p>
  }

  return (
    <div className="flex items-center p-5 h-screen justify-center">
      <div className="max-w-2xl w-full h-[50vh] flex items-center justify-center p-6 shadow-lg hover:shadow-xl transition transform border border-gray-200 rounded-xl">
        <div className="flex flex-col items-center">
          <img
            src={fltUser.photoURL || '/default-profile.png'}
            alt={fltUser.userName}
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-green-600"
          />
          <h2 className="text-2xl font-bold mb-2">{fltUser.userName}</h2>
          <p className="mb-1">Email: {fltUser.userEmail}</p>
          {fltUser.role !== 'fraud' ? (
            <p className="">
              Role:{' '}
              <span className="text-yellow-600 px-3 py-0.5 rounded-full bg-yellow-600/15">
                {fltUser.role}
              </span>
            </p>
          ) : (
            <p className="">
              Role:{' '}
              <span className="text-red-600 px-3 py-0.5 rounded-full bg-red-600/15">
                {fltUser.role}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default VendorProfile
