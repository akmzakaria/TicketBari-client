import { use, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { TbCurrencyTaka } from 'react-icons/tb'
import { IoBus } from 'react-icons/io5'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import { PiClockCountdownBold } from 'react-icons/pi'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Loading from '../../Components/Loading/Loading'
import { AuthContext } from '../../Context/AuthContext'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Aos from 'aos'

const TicketDetails = () => {
  const instance = useAxiosSecure()
  const { id } = useParams()
  const { user, loading } = use(AuthContext)

  const [countdown, setCountdown] = useState('Loading...')
  const [bookingQty, setBookingQty] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isLoading, data: ticket = {} } = useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const res = await instance.get(`/tickets/${id}`)
      return res.data
    },
  })

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  // countdown timer
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

  if (isLoading || loading) return <Loading />

  // quantity logic (now allows 0)
  const increaseQty = () => {
    if (bookingQty < ticket.quantity) {
      setBookingQty((prev) => prev + 1)
    }
  }

  const decreaseQty = () => {
    if (bookingQty > 0) {
      setBookingQty((prev) => prev - 1)
    }
  }

  const totalPrice = bookingQty * ticket.price

  const handleBookTicket = () => {
    if (!user) {
      return toast.error('Please login!', {
        position: 'top-center',
      })
    }
    if (bookingQty === 0) {
      return
    }

    const data = {
      ticketId: ticket._id,
      title: ticket.title,
      image: ticket.image,
      bookingQty,
      quantity: ticket.quantity,
      price: ticket.price,
      totalPrice,
      from: ticket.from,
      to: ticket.to,
      departure: ticket.departure,
      bookingStatus: 'pending',
      userEmail: user.email,
      vendorEmail: ticket.vendor_email,
    }

    instance.post('/booked-tickets', data).then((res) => {
      if (res.status === 200) {
        toast.success('Booking request sent!', { position: 'top-center' })
      } else {
        toast.error('Cannot send booking request!', { position: 'top-center' })
      }
    })
  }

  return (
    <div data-aos="fade-in" className="h-[92vh] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full rounded-lg shadow-xl overflow-hidden">
        <img src={ticket.image} alt="ticket" className="w-full h-72 object-cover" />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>

          <p className="text-gray-600 mb-4">
            {ticket.from} → {ticket.to}
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-black/10 px-3 py-1 rounded text-sm flex items-center gap-1">
              <IoBus /> {ticket.transport}
            </span>
            <span className="bg-black/10 px-3 py-1 rounded text-sm flex items-center">
              <TbCurrencyTaka /> {ticket.price}
            </span>
            <span className="bg-black/10 px-3 py-1 rounded text-sm flex items-center gap-1">
              <MdOutlineConfirmationNumber /> Available: {ticket.quantity}
            </span>
          </div>

          <p className="mb-2">
            <span className="font-semibold">Departure:</span>{' '}
            {new Date(ticket.departure).toLocaleString()}
          </p>

          <p className="text-red-600 font-semibold mb-4 flex items-center gap-1">
            <PiClockCountdownBold />
            Time left: {countdown}
          </p>

          <div className="flex justify-between gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={countdown === 'Departed'}
              className={`px-4 py-2 rounded text-white transition ${
                countdown === 'Departed'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#086c52] hover:bg-[#064e3b]'
              }`}
            >
              Book Now
            </button>

            <Link
              to={-1}
              className="px-4 py-2 border border-[#086c52] text-[#086c52] rounded hover:bg-[#cae1db] transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Select Ticket Quantity</h3>

            <div className="flex items-center justify-center gap-6 mb-4">
              <button onClick={decreaseQty} className="btn btn-outline btn-sm">
                −
              </button>

              <span className="text-xl font-semibold">{bookingQty}</span>

              <button onClick={increaseQty} className="btn btn-outline btn-sm">
                +
              </button>
            </div>

            <p className="text-center mb-2">
              Available tickets: <b>{ticket.quantity}</b>
            </p>

            <p className="text-center font-semibold mb-6">Total Price: ৳ {totalPrice}</p>

            <div className="modal-action">
              <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost">
                Cancel
              </button>

              <button
                disabled={bookingQty === 0}
                onClick={() => {
                  handleBookTicket()
                  setIsModalOpen(false)
                }}
                className={`btn text-white ${
                  bookingQty === 0 ? 'bg-[#086c52]/60' : 'bg-[#086c52] hover:bg-[#064e3b]'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default TicketDetails
