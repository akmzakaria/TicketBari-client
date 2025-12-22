import React from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Loading from '../../../Loading/Loading'

const AdvertiseTickets = () => {
  const instance = useAxiosSecure()

  const {
    isLoading,
    refetch,
    data: tickets = [],
  } = useQuery({
    queryKey: ['approved'],
    queryFn: async () => {
      const res = await instance.get(`/tickets?ticketStatus=approved`)
      return res.data
    },
  })

  const {
    isLoading: adLoading,
    refetch: adRefetch,
    data: advertisedTickets = [],
  } = useQuery({
    queryKey: ['advertised'],
    queryFn: async () => {
      const res = await instance.get(`/tickets?advertiseStatus=advertised`)
      return res.data
    },
  })

  const confirmAdvertise = (id) => {
    if (advertisedTickets.length >= 6) {
      toast.error('Cannot advertise more than 6 tickets', {
        position: 'top-center',
      })
      return
    }

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Advertise this ticket?</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => toast.dismiss(t.id)} className="btn btn-xs btn-outline">
            Cancel
          </button>
          <button
            onClick={async () => {
              await instance
                .patch(`/tickets/${id}`, {
                  advertiseStatus: 'advertised',
                })
                .then(() => {
                  refetch()
                  adRefetch()
                  toast.dismiss(t.id)
                  toast.success('Ticket advertised', {
                    position: 'top-center',
                  })
                })
            }}
            className="btn btn-xs btn-outline hover:bg-green-600 border-green-600 text-green-600 hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    ))
  }

  if (adLoading || isLoading) {
    return <Loading></Loading>
  }

  const confirmUnadvertise = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Unadvertise this ticket?</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => toast.dismiss(t.id)} className="btn btn-xs btn-outline">
            Cancel
          </button>
          <button
            onClick={async () => {
              await instance
                .patch(`/tickets/${id}`, {
                  advertiseStatus: 'N/A',
                })
                .then(() => {
                  refetch()
                  adRefetch()
                  toast.dismiss(t.id)
                  toast.success('Ticket unadvertised', {
                    position: 'top-center',
                  })
                })
            }}
            className="btn btn-xs btn-outline hover:bg-red-600 border-red-600 text-red-600 hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    ))
  }

  return (
    <div className="m-5">
      <h2 className="text-2xl font-bold">Manage Advertise</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SI No</th>
              <th>Title</th>
              <th>Perks</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, i) => (
              <tr key={ticket._id}>
                <th>{i + 1}</th>
                <td>{ticket.title}</td>
                <td className="flex gap-2">
                  {ticket.perks.map((perk) => (
                    <span key={perk} className="w-fit px-2 py-px rounded-full bg-gray-200">
                      {perk}
                    </span>
                  ))}
                </td>
                <td>{ticket.price} BDT</td>
                <td>
                  {ticket.advertiseStatus === 'advertised' ? (
                    <button
                      onClick={() => confirmUnadvertise(ticket._id)}
                      className="btn btn-xs btn-outline hover:bg-red-600 border-red-600 text-red-600 hover:text-white"
                    >
                      Unadvertise
                    </button>
                  ) : (
                    <button
                      onClick={() => confirmAdvertise(ticket._id)}
                      className="btn btn-xs btn-outline hover:bg-green-600 border-green-600 text-green-600 hover:text-white"
                    >
                      Advertise
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdvertiseTickets
