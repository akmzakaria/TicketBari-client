import React, { use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../../../Context/AuthContext'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import { TbCurrencyTaka } from 'react-icons/tb'
import { GoClock } from 'react-icons/go'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router'
import Loading from '../../../Loading/Loading'

const VendorAddedTickets = () => {
  const { user, loading } = use(AuthContext)
  const instance = useAxiosSecure()
  // console.log(user.email)

  const {
    isLoading,
    data: tickets = [],
    refetch,
  } = useQuery({
    queryKey: ['vendor-tickets', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/tickets?vendor_email=${user.email}`)
      return res.data
    },
  })

  // console.log(tickets)

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/tickets/${id}`)
      refetch()

      toast.success('Ticket deleted successfully', {
        position: 'top-center',
      })
    } catch (error) {
      toast.error('Failed to delete ticket', {
        position: 'top-center',
      })
    }
  }

  if (isLoading || loading) {
    return <Loading></Loading>
  }

  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className={`flex flex-col gap-3 `}>
          <p className="font-semibold">Are you sure you want to delete this ticket?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => toast.dismiss(t.id)} className="btn btn-xs btn-outline">
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(id)
                toast.dismiss(t.id)
              }}
              className="btn btn-xs btn-outline hover:bg-red-600 border-red-600 text-red-600 hover:text-white"
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
      <Toaster position="bottom-center" reverseOrder={true} />
      <h2 className="text-2xl font-bold m-5">My Added Tickets</h2>

      {tickets.length === 0 ? (
        <div className="flex justify-center items-center h-[75vh]">
          <p>You haven't added any tickets yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pb-10">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col justify-between"
            >
              <img src={ticket.image} alt={ticket.title} className="w-full h-48 object-cover" />

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-1">{ticket.title}</h3>
                <p className="text-gray-600 mb-2">
                  {ticket.from} → {ticket.to}
                </p>

                <p className="text-sm mb-1 flex items-center gap-1">
                  <MdOutlineConfirmationNumber /> Quantity:{' '}
                  <span className="font-medium">{ticket.quantity}</span>
                </p>

                <p className="text-sm mb-2 flex items-center gap-1">
                  <TbCurrencyTaka /> Total Price:{' '}
                  <span className="font-semibold">{ticket.price} BDT</span>
                </p>

                <p className="text-sm mb-2 flex items-center gap-1">
                  <GoClock /> {new Date(ticket.departure).toLocaleString()}
                </p>

                <div className="flex justify-between items-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize
                    ${
                      ticket.ticketStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : ticket.ticketStatus === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {ticket.ticketStatus}
                  </span>
                </div>

                {ticket.ticketStatus !== 'rejected' ? (
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => confirmDelete(ticket._id)}
                      className="btn btn-sm rounded-full btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/edit-ticket/${ticket._id}`}
                      className="btn btn-sm rounded-full btn-outline text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Update
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-between mt-2">
                    <button
                      disabled
                      onClick={() => confirmDelete(ticket._id)}
                      className="bg-gray-200 px-3 py-2 outline text-xs rounded-full btn-outline hover:cursor-not-allowed text-red-600 border-red-600"
                    >
                      Delete
                    </button>
                    <button
                      disabled
                      className="bg-gray-200 px-3 py-2 outline text-xs rounded-full btn-outline hover:cursor-not-allowed text-green-600 border-green-600"
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VendorAddedTickets
