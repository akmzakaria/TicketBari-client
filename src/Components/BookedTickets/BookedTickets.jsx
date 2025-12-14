import { useEffect, useState } from 'react'
import useAxios from '../../Hooks/useAxios'
import Loading from '../Loading/Loading'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import { TbCurrencyTaka } from 'react-icons/tb'
import { FaClock } from 'react-icons/fa6'
import { PiClockCountdownBold } from 'react-icons/pi'
import { GoClock } from 'react-icons/go'

const BookedTickets = () => {
  const [tickets, setTickets] = useState([])
  const [countdowns, setCountdowns] = useState({})
  const instance = useAxios()

  // Fetch booked tickets
  useEffect(() => {
    instance.get('/booked-tickets').then((res) => {
      setTickets(res.data)
    })
  }, [instance])

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

  // Loading state
  if (!tickets.length) {
    return <Loading></Loading>
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">My Booked Tickets</h2>

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
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookedTickets
