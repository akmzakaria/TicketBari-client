import React, { useEffect, useState } from 'react'
import useAxios from '../../../../Hooks/useAxios'
import { Link, useParams } from 'react-router'
import { TbCurrencyTaka } from 'react-icons/tb'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import { IoBus } from 'react-icons/io5'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'

const TickstDetailsAdmin = () => {
  const instance = useAxiosSecure()
  const { id } = useParams()
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    instance.get('/tickets').then((res) => {
      setTickets(res.data)
    })
  }, [])

  const ticket = tickets.find((t) => t._id === id)
  // console.log(ticket)

  return (
    <div>
      <p>this is ticket details for admin only</p>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={ticket?.image} alt="ticket" className="w-full h-72 object-cover" />

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{ticket?.title}</h2>

            <p className="text-gray-600 mb-4">
              {ticket?.from} → {ticket?.to}
            </p>

            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-1">
                <IoBus /> {ticket?.transport}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center">
                <TbCurrencyTaka /> {ticket?.price}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded text-sm flex items-center gap-1">
                <MdOutlineConfirmationNumber /> Available: {ticket?.quantity}
              </span>
            </div>

            <p className="mb-2">
              <span className="font-semibold">Departure:</span>{' '}
              {new Date(ticket?.departure).toLocaleString()}
            </p>
            {/* 
            <p className="text-red-600 font-semibold mb-2 flex items-center gap-1">
              <PiClockCountdownBold />
              Time left: {countdown}
            </p> */}

            <div className="flex justify-between gap-3">
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
    </div>
  )
}

export default TickstDetailsAdmin
