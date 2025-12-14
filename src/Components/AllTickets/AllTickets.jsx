import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../Loading/Loading'
import useAxios from '../../Hooks/useAxios'
import TicketCard from '../TicketCard/TicketCard'
import { useQuery } from '@tanstack/react-query'

const AllTickets = () => {
  const { loading } = use(AuthContext)
  const [showLoading, setShowLoading] = useState(true)
  const instance = useAxios()
  //   const [tickets, setTickets] = useState([])

  //   useEffect(() => {
  //     instance.get('/tickets').then((res) => {
  //       setTickets(res.data)
  //     })
  //   }, [instance])

  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets', 'approved'],
    queryFn: async () => {
      const res = await instance.get('/tickets?ticketStatus=approved')
      return res.data
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading || showLoading || tickets.length === 0) {
    return <Loading></Loading>
  }

  return (
    <div className="max-w-350 px-5 mx-auto">
      {/* All Tickets section */}
      <div className="">
        <h2 className="text-3xl font-bold text-center my-5">All Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllTickets
