import React, { use, useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading'
import { AuthContext } from '../../Context/AuthContext'
import useAxios from '../../Hooks/useAxios'
import TicketCard from '../../Components/TicketCard/TicketCard'
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs'
import PopularRoutes from '../../Components/PopularRoutes/PopularRoutes'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const Home = () => {
  const { loading } = use(AuthContext)
  const [showLoading, setShowLoading] = useState(true)
  const instance = useAxiosSecure()
  // const axios = useAxios()

  const { data: fraudUser = [] } = useQuery({
    queryKey: ['users', 'fraud'],
    queryFn: async () => {
      const res = await instance.get('/users?role=fraud')
      return res.data
    },
  })

  const { data: adTickets = [] } = useQuery({
    queryKey: ['tickets', 'advertised'],
    queryFn: async () => {
      const res = await instance.get('/tickets?advertiseStatus=advertised')
      return res.data
    },
  })

  const { data: latestTickets = [] } = useQuery({
    queryKey: ['tickets', 'approved', 6],
    queryFn: async () => {
      const res = await instance.get('/tickets?ticketStatus=approved&limit=6')
      return res.data
    },
  })

  const filteredLatestTickets = latestTickets.filter((ticket) => {
    const isFraud = fraudUser.some((user) => user.userEmail === ticket.vendor_email)

    return !isFraud
  })

  const filteredAdTickets = adTickets.filter((ticket) => {
    const isFraud = fraudUser.some((user) => user.userEmail === ticket.vendor_email)

    return !isFraud
  })

  // console.log(filteredLatestTickets)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading || showLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="md:max-w-350 px-2 md:px-5 mx-auto">
      {/* Advertisement section */}
      {filteredAdTickets.length !== 0 && (
        <div className="bg-black/5 shadow-xl border border-gray-200 px-3 md:px-10 py-5 md:pb-10 mt-5 rounded-lg">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-5">Advertisements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredAdTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
            ))}
          </div>
        </div>
      )}

      {/* Latest Tickets section */}
      <div className="bg-black/5 shadow-xl border border-gray-200 px-3 md:px-10 py-5 md:pb-10 mt-15 rounded-lg">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-5">Latest Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredLatestTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
          ))}
        </div>
      </div>

      <div>
        <PopularRoutes></PopularRoutes>
      </div>

      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>
    </div>
  )
}

export default Home
