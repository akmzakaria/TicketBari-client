import React from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'

const ManageTickets = () => {
  const instance = useAxiosSecure()

  const { refetch, data: tickets = [] } = useQuery({
    queryKey: ['tickets', 'pending', 'manage-tickets'],
    queryFn: async () => {
      const res = await instance.get('/tickets?ticketStatus=pending')
      return res.data
    },
  })

  const handleApprove = async (id) => {
    try {
      await instance.patch(`/tickets/${id}`, { ticketStatus: 'approved' })
      refetch()
      toast.success('Ticket approved', {
        position: 'top-center',
      })
    } catch (error) {
      toast.error('Failed to approve ticket')
    }
  }

  const handleReject = async (id) => {
    try {
      await instance.patch(`/tickets/${id}`, { ticketStatus: 'rejected' })
      refetch()
      toast.success('Ticket rejected', {
        position: 'top-center',
      })
    } catch (error) {
      toast.error('Failed to reject ticket')
    }
  }

  const confirmAction = (id, action) => {
    toast(
      (t) => (
        <div className={`flex flex-col gap-5 `}>
          <p className="font-semibold">Are you sure you want to {action} this ticket?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => toast.dismiss(t.id)} className="btn btn-xs btn-outline">
              Cancel
            </button>
            <button
              onClick={() => {
                if (action === 'approve') handleApprove(id)
                if (action === 'reject') handleReject(id)
                toast.dismiss(t.id)
              }}
              className={`btn btn-xs ${
                action === 'approve'
                  ? 'btn-outline hover:bg-green-500 border-green-600 text-green-600 hover:text-white'
                  : 'btn-outline hover:bg-red-500 border-red-600 text-red-600 hover:text-white'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-5 ml-5">Manage Tickets:</h2>
      <div>
        {tickets.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <p>No ticket requests!</p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-center">
                    <th>SI. No</th>
                    <th>Ticket Title</th>
                    <th>Vendor Name</th>
                    <th>Vendor Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, i) => (
                    <tr key={ticket._id} className="text-center">
                      <th>{i + 1}</th>
                      <td>{ticket.title}</td>
                      <td>{ticket.vendor_name}</td>
                      <td>{ticket.vendor_email}</td>

                      <td className="flex md:flex-row flex-col justify-center gap-1 md:gap-2">
                        <Link
                          to={`/dashboard/ticket-details-admin/${ticket._id}`}
                          className="btn w-25 md:w-fit btn-xs"
                        >
                          See Details
                        </Link>
                        <button
                          onClick={() => confirmAction(ticket._id, 'approve')}
                          className="btn w-25 md:w-fit btn-xs btn-outline hover:bg-green-500 border-green-600 text-green-600 hover:text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => confirmAction(ticket._id, 'reject')}
                          className="btn w-25 md:w-fit btn-xs btn-outline hover:bg-red-500 border-red-600 text-red-600 hover:text-white"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageTickets
