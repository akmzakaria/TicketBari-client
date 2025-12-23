import React, { use, useEffect, useState } from 'react'
import useAxios from '../../../../Hooks/useAxios'
import { Link, useParams } from 'react-router'
import { TbCurrencyTaka } from 'react-icons/tb'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import { IoBus } from 'react-icons/io5'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { AuthContext } from '../../../../Context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../Loading/Loading'
import Aos from 'aos'

const TickstDetailsAdmin = () => {
  const { loading } = use(AuthContext)
  const instance = useAxiosSecure()
  const { id } = useParams()
  // const [tickets, setTickets] = useState([])

  // useEffect(() => {
  //   instance.get('/tickets').then((res) => {
  //     setTickets(res.data)
  //   })
  // }, [])

  const { isLoading, data: ticket = {} } = useQuery({
    queryKey: [id, 'ticket'],
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

  // const ticket = tickets.find((t) => t._id === id)
  // console.log(ticket)

  if (loading || isLoading) {
    return <Loading></Loading>
  }

  return (
    <div data-aos="fade-in" className=" flex h-[87vh] items-center my-5 justify-center p-4">
      <div className="max-w-3xl w-full rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <img src={ticket?.image} alt="ticket" className="w-full h-72 object-cover" />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{ticket?.title}</h2>

          <p className="text-gray-600 mb-4">
            {ticket?.from} → {ticket?.to}
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-black/10 px-3 py-1 rounded text-sm flex items-center gap-1">
              <IoBus /> {ticket?.transport}
            </span>
            <span className="bg-black/10 px-3 py-1 rounded text-sm flex items-center">
              <TbCurrencyTaka /> {ticket?.price}
            </span>
            <span className="bg-black/10 px-3 py-1 rounded text-sm flex items-center gap-1">
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
              className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TickstDetailsAdmin
