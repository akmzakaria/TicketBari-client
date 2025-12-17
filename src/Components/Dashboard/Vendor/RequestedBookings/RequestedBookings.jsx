import React from 'react'
import useAxios from '../../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

const RequestedBookings = () => {
  const instance = useAxios()

  const { refetch, data: tickets = [] } = useQuery({
    queryKey: ['booked-tickets', 'pending'],
    queryFn: async () => {
      const res = await instance.get('/booked-tickets?bookingStatus=pending')
      return res.data
    },
  })

  const handleApprove = (id) => {
    instance.patch(`/booked-tickets/${id}`, { bookingStatus: 'accepted' })
    refetch()
  }

  const handleReject = (id) => {
    instance.patch(`/booked-tickets/${id}`, { bookingStatus: 'rejected' })
    refetch()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Requested Bookings:</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
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
            {/* row 1 */}

            {tickets.map((ticket, i) => (
              <tr key={ticket._id} className="text-center">
                <th>{i + 1}</th>
                <td>{ticket.userEmail}</td>
                <td>{ticket.title}</td>
                <td>{ticket.bookingQty}</td>
                <td>{ticket.totalPrice}</td>

                <td className="flex md:flex-row flex-col justify-center gap-5 md:gap-1">
                  <button
                    onClick={() => handleApprove(ticket._id)}
                    className="btn w-25 md:w-fit btn-xs"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(ticket._id)}
                    className="btn w-25 md:w-fit btn-xs"
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
