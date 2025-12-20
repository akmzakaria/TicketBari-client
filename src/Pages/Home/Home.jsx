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
  //   const [tickets, setTickets] = useState([])

  //   useEffect(() => {
  //     instance.get('/tickets').then((res) => {
  //       setTickets(res.data)
  //     })
  //   }, [instance])

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
    <div className="max-w-350 px-5 mx-auto">
      {/* Advertisement section */}
      {adTickets.length !== 0 && (
        <div className="">
          <h2 className="text-3xl font-bold text-center my-10">Advertisements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {adTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
            ))}
          </div>
        </div>
      )}

      {/* Latest Tickets section */}
      <div>
        <h2 className="text-3xl font-bold text-center mt-10 mb-10">Latest Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestTickets.map((ticket) => (
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
