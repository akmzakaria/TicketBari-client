import { use, useEffect, useState } from 'react'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import { TbCurrencyTaka } from 'react-icons/tb'
import { FaClock } from 'react-icons/fa6'
import { PiClockCountdownBold } from 'react-icons/pi'
import { GoClock } from 'react-icons/go'
import useAxios from '../../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../../../Context/AuthContext'
import Loading from '../../../Loading/Loading'

const BookedTickets = () => {
  // const [tickets, setTickets] = useState([])
  const [countdowns, setCountdowns] = useState({})
  const instance = useAxios()
  const { user, loading } = use(AuthContext)

  // Fetch booked tickets
  // useEffect(() => {
  //   instance.get('/booked-tickets').then((res) => {
  //     setTickets(res.data)
  //   })
  // }, [instance])

  const { isLoading, data: tickets = [] } = useQuery({
    queryKey: ['booked-tickets', user.email, 'accepted'],
    queryFn: async () => {
      const res = await instance.get(
        `/booked-tickets?userEmail=${user.email}&bookingStatus=accepted`
      )
      return res.data
    },
  })

  // Countdown logic (SAFE)
  useEffect(() => {
    if (!tickets.length) return

    const updateCountdowns = () => {
      const now = Date.now()
      const updated = {}

      tickets.forEach((ticket) => {
        const dep = new Date(ticket.departure).getTime()
        const diff = dep - now

        if (diff <= 0) {
          updated[ticket._id] = 'Departed'
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
          const minutes = Math.floor((diff / (1000 * 60)) % 60)
          const seconds = Math.floor((diff / 1000) % 60)

          updated[ticket._id] = `${days}d ${hours}h ${minutes}m ${seconds}s`
        }
      })

      setCountdowns(updated)
    }

    updateCountdowns() // run immediately
    const interval = setInterval(updateCountdowns, 1000)

    return () => clearInterval(interval)
  }, [tickets])

  // make payment
  const handlePayment = async (ticket) => {
    const paymentInfo = {
      totalPrice: ticket.totalPrice,
      ticketId: ticket._id,
      userEmail: ticket.userEmail,
      title: ticket.title,
      // trackingId: ticket.trackingId,
    }

    const res = await instance.post('/create-checkout-session', paymentInfo)
    // console.log(res.data)
    window.location.assign(res.data.url)
  }

  // Loading state
  if (loading || isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">My Booked Tickets</h2>

      {tickets.length === 0 && (
        <div className="flex justify-center h-[70vh] items-center">
          <p>You haven't purchase any ticket yet!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          //   const totalPrice = ticket.price * ticket.quantity

          return (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <img src="/logo1.png" alt={ticket.title} className="w-full h-48 object-cover" />

              <div className="p-5">
                {/* Title */}
                <h3 className="text-xl font-semibold mb-1">{ticket.title}</h3>

                {/* Route */}
                <p className="text-gray-600 mb-2">
                  {ticket.from} → {ticket.to}
                </p>

                {/* Quantity */}
                <p className="text-sm mb-1 flex items-center gap-1">
                  <MdOutlineConfirmationNumber /> Quantity:{' '}
                  <span className="font-medium">{ticket.bookingQty}</span>
                </p>

                {/* Price */}
                <p className="text-sm mb-2 flex items-center gap-1">
                  <TbCurrencyTaka />
                  Total Price: <span className="font-semibold">{ticket.totalPrice} BDT</span>
                </p>

                {/* Departure */}
                <p className="text-sm mb-2 flex items-center gap-1">
                  <GoClock />
                  {new Date(ticket.departure).toLocaleString()}
                </p>

                {/* Countdown */}
                <p className="text-red-600 font-semibold text-sm mb-3 flex items-center gap-1">
                  <PiClockCountdownBold />
                  {countdowns[ticket._id] || 'Calculating...'}
                </p>

                {/* booking status */}
                <div className="flex justify-between items-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize
                    ${
                      ticket.bookingStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : ticket.bookingStatus === 'accepted'
                        ? 'bg-blue-100 text-blue-700'
                        : ticket.bookingStatus === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {ticket.bookingStatus}
                  </span>
                  <button
                    onClick={() => handlePayment(ticket)}
                    className="btn btn-sm rounded-full bg-green-600 text-white active:scale-100 hover:scale-105 hover:bg-green-700 transition"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookedTickets
