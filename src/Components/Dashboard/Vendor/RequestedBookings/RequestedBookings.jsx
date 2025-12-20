import React, { use } from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from '../../../../Context/AuthContext'

const RequestedBookings = () => {
  const instance = useAxiosSecure()
  const { user } = use(AuthContext)

  const { refetch, data: tickets = [] } = useQuery({
    queryKey: ['booked-tickets', 'pending', user.email],
    queryFn: async () => {
      const res = await instance.get(`/booked-tickets?bookingStatus=pending&email=${user.email}`)
      return res.data
    },
  })

  const handleApprove = async (id) => {
    try {
      await instance.patch(`/booked-tickets/${id}`, { bookingStatus: 'accepted' })
      refetch()
      toast.success('Booking accepted')
    } catch (error) {
      toast.error('Failed to accept booking')
    }
  }

  const handleReject = async (id) => {
    try {
      await instance.patch(`/booked-tickets/${id}`, { bookingStatus: 'rejected' })
      refetch()
      toast.success('Booking rejected')
    } catch (error) {
      toast.error('Failed to reject booking')
    }
  }

  const confirmAction = (id, action) => {
    toast(
      (t) => (
        <div className={` flex flex-col gap-3 `}>
          <p className="font-semibold">Are you sure you want to {action} this booking?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => toast.dismiss(t.id)} className="btn btn-xs btn-outline">
              Cancel
            </button>
            <button
              onClick={() => {
                if (action === 'accept') handleApprove(id)
                if (action === 'reject') handleReject(id)
                toast.dismiss(t.id)
              }}
              className={`btn btn-xs ${action === 'accept' ? 'btn-success' : 'btn-error'}`}
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
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">Requested Bookings:</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-center">
              <th>SI. No</th>
              <th>User Email</th>
              <th>Ticket Title</th>
              <th>Booking Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, i) => (
              <tr key={ticket._id} className="text-center">
                <th>{i + 1}</th>
                <td>{ticket.userEmail}</td>
                <td>{ticket.title}</td>
                <td>{ticket.bookingQty}</td>
                <td>{ticket.totalPrice}</td>

                <td className="flex md:flex-row flex-col justify-center gap-5 md:gap-1">
                  <button
                    onClick={() => confirmAction(ticket._id, 'accept')}
                    className="btn w-25 md:w-fit btn-xs btn-success"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => confirmAction(ticket._id, 'reject')}
                    className="btn w-25 md:w-fit btn-xs btn-error"
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
  )
}

export default RequestedBookings
