import React from 'react'
import useAxios from '../../../../Hooks/useAxios'
import { AuthContext } from '../../../../Context/AuthContext'
import { useQuery } from '@tanstack/react-query'

const ManageUsers = () => {
  //   const { user } = use(AuthContext)
  //   const [users, setUsers] = useState([])

  //   useEffect(() => {
  //     instance.get('/users').then((res) => {
  //       setUsers(res.data)
  //     })
  //   }, [])

  const instance = useAxios()

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await instance.get(`/users`)
      return res.data
    },
  })

  const handleMakeVendor = async (id) => {
    instance.patch(`/users/${id}`, { role: 'vendor' })
    refetch()
  }

  const handleMakeAdmin = async (id) => {
    instance.patch(`/users/${id}`, { role: 'admin' })
    refetch()
  }

  const handleMakeUser = async (id) => {
    instance.patch(`/users/${id}`, { role: 'user' })
    refetch()
  }

  const handleMarkFraud = async (id) => {
    instance.patch(`/users/${id}`, { role: 'fraud' })
    refetch()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-5 ml-5">Manage Users:</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>SI. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user, i) => (
              <tr key={user._id} className="text-center">
                <th>{i + 1}</th>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.role}</td>
                <td className="flex md:flex-row flex-col justify-center gap-5 md:gap-1">
                  <button
                    onClick={() => handleMakeUser(user._id)}
                    className="btn w-25 md:w-fit btn-xs"
                  >
                    Make User
                  </button>
                  <button
                    onClick={() => handleMakeVendor(user._id)}
                    className="btn w-25 md:w-fit btn-xs"
                  >
                    Make Vendor
                  </button>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn w-25 md:w-fit btn-xs"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleMarkFraud(user._id)}
                    className="btn w-25 md:w-fit btn-xs"
                  >
                    Mark Fraud
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers
