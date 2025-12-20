import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { toast, Toaster } from 'react-hot-toast'

const ManageUsers = () => {
  const instance = useAxiosSecure()

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await instance.get(`/users`)
      return res.data
    },
    // staleTime: 5 * 60 * 1000,
  })

  const handleRoleChange = async (id, role) => {
    try {
      await instance.patch(`/users/${id}`, { role }).then(() => {
        refetch()
        toast.success(`User role changed to ${role}`)
      })
    } catch (error) {
      toast.error('Failed to change role')
    }
  }

  const confirmRoleChange = (id, role) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span className="font-semibold">
            Are you sure you want to change this user to {role}?
          </span>
          <div className="flex gap-2 justify-end">
            <button className="btn btn-xs btn-outline" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </button>
            <button
              className="btn btn-xs btn-outline hover:bg-green-500 border-green-600 text-green-600 hover:text-white"
              onClick={() => {
                handleRoleChange(id, role)
                toast.dismiss(t.id)
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-5 ml-5">Manage Users:</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
            {users.map((user, i) => (
              <tr key={user._id} className="text-center">
                <th>{i + 1}</th>
                <td>{user.userName}</td>
                <td>{user.userEmail}</td>
                <td>{user.role}</td>
                <td className="flex md:flex-row flex-col justify-center gap-1 md:gap-2">
                  <button
                    onClick={() => confirmRoleChange(user._id, 'user')}
                    className="btn w-25 md:w-fit btn-xs btn-outline hover:bg-slate-600 border-slate-600 text-slate-600 hover:text-white"
                  >
                    Make User
                  </button>
                  <button
                    onClick={() => confirmRoleChange(user._id, 'vendor')}
                    className="btn w-25 md:w-fit btn-xs btn-outline hover:bg-yellow-600 border-yellow-600 text-yellow-600 hover:text-white"
                  >
                    Make Vendor
                  </button>
                  <button
                    onClick={() => confirmRoleChange(user._id, 'admin')}
                    className="btn w-25 md:w-fit btn-xs btn-outline hover:bg-green-600 border-green-600 text-green-600 hover:text-white"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => confirmRoleChange(user._id, 'fraud')}
                    className="btn w-25 md:w-fit btn-xs btn-outline hover:bg-red-600 border-red-600 text-red-600 hover:text-white"
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
