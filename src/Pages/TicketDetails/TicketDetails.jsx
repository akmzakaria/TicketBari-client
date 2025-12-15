import { use, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import useAxios from '../../Hooks/useAxios'
import { TbCurrencyTaka } from 'react-icons/tb'
import { IoBus } from 'react-icons/io5'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import Loading from '../../Components/Loading/Loading'
import { PiClockCountdownBold } from 'react-icons/pi'
import { AuthContext } from '../../Context/AuthContext'

const TicketDetails = () => {
  const instance = useAxios()
  const { id } = useParams()

  const { user } = use(AuthContext)
  //   console.log(user.email)

  const [tickets, setTickets] = useState([])
  const [ticket, setTicket] = useState(null)
  const [countdown, setCountdown] = useState('Loading...')
  const [bookingQty, setBookingQty] = useState(1)

  // Fetch tickets
  useEffect(() => {
    instance.get('/tickets').then((res) => {
      setTickets(res.data)
    })
  }, [])

  // Find selected ticket
  useEffect(() => {
    if (tickets.length > 0) {
      const fltData = tickets.find((t) => t._id === id)
      setTicket(fltData)
    }
  }, [tickets, id])

  // Countdown logic
  useEffect(() => {
    if (!ticket?.departure) return

    const updateCountdown = () => {
      const now = Date.now()
      const departureTime = new Date(ticket.departure).getTime()
      const diff = departureTime - now

      if (diff <= 0) {
        setCountdown('Departed')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [ticket?.departure])

  if (!ticket) return <Loading />

  // Quantity handlers
  const increaseQty = () => {
    if (bookingQty < ticket.quantity) {
      setBookingQty((prev) => prev + 1)
    }
  }

  const decreaseQty = () => {
    if (bookingQty > 1) {
      setBookingQty((prev) => prev - 1)
    }
  }

  const totalPrice = bookingQty * ticket.price

  const handleBookTicket = () => {
    const data = {
      ticketId: ticket._id,
      title: ticket.title,
      image: ticket.image,
      bookingQty,
      price: ticket.price,
      totalPrice,
      from: ticket.from,
      to: ticket.to,
      departure: ticket.departure,
      bookingStatus: 'pending',
      userEmail: user.email,
    }

    instance.post('/booked-tickets', data)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={ticket.image || '/logo1.png'} alt="ticket" className="w-full h-72 object-cover" />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>

          <p className="text-gray-600 mb-4">
            {ticket.from} → {ticket.to}
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-1">
              <IoBus /> {ticket.transport}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center">
              <TbCurrencyTaka /> {ticket.price}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-1">
              <MdOutlineConfirmationNumber /> Available: {ticket.quantity}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Booking Quantity</p>
            <div className="flex items-center gap-4">
              <button onClick={decreaseQty} className="px-3 py-1 border rounded hover:bg-gray-100">
                −
              </button>
              <span className="font-semibold">{bookingQty}</span>
              <button onClick={increaseQty} className="px-3 py-1 border rounded hover:bg-gray-100">
                +
              </button>
            </div>
          </div>

          <p className="mb-2">
            <span className="font-semibold">Departure:</span>{' '}
            {new Date(ticket.departure).toLocaleString()}
          </p>

          <p className="text-red-600 font-semibold mb-2 flex items-center gap-1">
            <PiClockCountdownBold />
            Time left: {countdown}
          </p>

          <p className="font-semibold mb-6">
            Total Price: <TbCurrencyTaka className="inline" /> {totalPrice}
          </p>

          <div className="flex justify-between gap-3">
            <button
              onClick={handleBookTicket}
              disabled={countdown === 'Departed'}
              className={`px-4 py-2 rounded text-white transition ${
                countdown === 'Departed'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Book Now
            </button>

            <Link
              to={-1}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetails
