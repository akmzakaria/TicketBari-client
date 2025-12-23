import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading'
import { AuthContext } from '../../Context/AuthContext'
import TicketCard from '../../Components/TicketCard/TicketCard'
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs'
import PopularRoutes from '../../Components/PopularRoutes/PopularRoutes'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import 'aos/dist/aos.css'
import Aos from 'aos'

const Home = () => {
  const { loading } = useContext(AuthContext)
  const [showLoading, setShowLoading] = useState(true)
  const instance = useAxiosSecure()

  // Fetch fraud users
  const { isLoading: fraudLoading, data: fraudUser = [] } = useQuery({
    queryKey: ['users', 'fraud'],
    queryFn: async () => {
      const res = await instance.get('/users?role=fraud')
      return res.data
    },
  })

  // Fetch advertised tickets
  const { isLoading: adLoading, data: adTickets = [] } = useQuery({
    queryKey: ['tickets', 'advertised'],
    queryFn: async () => {
      const res = await instance.get('/tickets?advertiseStatus=advertised')
      return res.data
    },
  })

  // Fetch latest tickets
  const { isLoading: approvedLoading, data: latestTickets = [] } = useQuery({
    queryKey: ['tickets', 'approved', 6],
    queryFn: async () => {
      const res = await instance.get('/tickets?ticketStatus=approved&limit=6')
      return res.data
    },
  })

  // Filter out fraud vendors
  const filteredLatestTickets = latestTickets.filter(
    (ticket) => !fraudUser.some((user) => user.userEmail === ticket.vendor_email)
  )

  const filteredAdTickets = adTickets.filter(
    (ticket) => !fraudUser.some((user) => user.userEmail === ticket.vendor_email)
  )

  useEffect(() => {
    Aos.init({
      // duration: 800,
      once: true,
    })
  }, [])

  // useEffect(() => {
  //   Aos.refresh()
  // }, [filteredAdTickets, filteredLatestTickets])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading || approvedLoading || adLoading || fraudLoading || showLoading) {
    return <Loading />
  }

  return (
    <div className="md:max-w-350 px-2 md:px-5 mx-auto">
      {/* Advertisement section */}
      {filteredAdTickets.length !== 0 && (
        <div className="bg-black/5 shadow-xl border border-gray-200 px-3 md:px-10 py-5 md:pb-10 mt-5 rounded-lg">
          <h2 data-aos="zoom-in" className="text-xl md:text-3xl font-bold text-center mb-5">
            Advertisements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredAdTickets.map((ticket, index) => (
              <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 250}>
                <TicketCard key={ticket._id} ticket={ticket} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest Tickets section */}
      <div className="bg-black/5 shadow-xl border border-gray-200 px-3 md:px-10 py-5 md:pb-10 mt-15 rounded-lg">
        <h2 data-aos="zoom-in" className="text-xl md:text-3xl font-bold text-center mb-5">
          Latest Tickets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredLatestTickets.map((ticket, index) => (
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 250}>
              <TicketCard key={ticket._id} ticket={ticket} />
            </div>
          ))}
        </div>
      </div>

      {/* Other sections */}
      <PopularRoutes />
      <WhyChooseUs />
    </div>
  )
}

export default Home
