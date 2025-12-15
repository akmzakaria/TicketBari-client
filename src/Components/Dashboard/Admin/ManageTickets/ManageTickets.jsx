import React from 'react'
import useAxios from '../../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

const ManageTickets = () => {
  const instance = useAxios()

  //   const { refetch, data: users = [] } = useQuery({
  //     queryKey: ['users'],
  //     queryFn: async () => {
  //       const res = await instance.get(`/users`)
  //       return res.data
  //     },
  //   })

  const { refetch, data: tickets = [] } = useQuery({
    queryKey: ['tickets', 'pending'],
    queryFn: async () => {
      const res = await instance.get('/tickets?ticketStatus=pending')
      return res.data
    },
  })

  const handleApprove = (id) => {
    instance.patch(`/tickets/${id}`, { ticketStatus: 'approved' })
    refetch()
  }

  const handleReject = (id) => {
    instance.patch(`/tickets/${id}`, { ticketStatus: 'rejected' })
    refetch()
  }

  //   console.log(tickets)

  return (
    <div>
      <h2 className="text-2xl font-bold  my-5 ml-5">Manage Tickets:</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
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
            {/* row 1 */}

            {tickets.map((ticket, i) => (
              <tr key={ticket._id} className="text-center">
                <th>{i + 1}</th>
                <td>{ticket.title}</td>
                <td>{ticket.vendor_name}</td>
                <td>{ticket.vendor_email}</td>

                <td className="flex md:flex-row flex-col justify-center gap-5 md:gap-1">
                  <Link
                    to={`/dashboard/ticket-details-admin/${ticket._id}`}
                    className="btn w-25 md:w-fit btn-xs"
                  >
                    See Details
                  </Link>
                  <button
                    onClick={() => handleApprove(ticket._id)}
                    className="btn w-25 md:w-fit btn-xs"
                  >
                    Approve
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

export default ManageTickets
