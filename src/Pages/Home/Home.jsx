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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link } from 'react-router'

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
    Aos.init({ once: true })
  }, [])

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
      {/* Hero section */}
      <section className="mt-6 md:mt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Hero content */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-3">
              Smart Ticketing, Seamless Journeys
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-base-content">
              Book your next trip with{' '}
              <span className="bg-linear-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                TicketGhor
              </span>
            </h1>
            <p className="text-sm md:text-base text-base-content/80 max-w-xl mb-6">
              Discover verified tickets from trusted vendors, avoid fraud in a single glance, and
              grab the best deals on popular routes — all in one modern dashboard experience.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                to="/all-tickets"
                className="btn bg-[#086c52] border-none text-white px-5 md:px-7 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold hover:scale-105 hover:bg-[#0a7e61] transition duration-300 active:scale-95"
              >
                Browse Tickets
              </Link>

              <a
                href="#latest-tickets"
                className="btn btn-outline border-emerald-400/60 text-emerald-300 px-5 md:px-7 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-emerald-500/10 hover:border-emerald-400 transition duration-300 active:scale-95"
              >
                View Latest Deals
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs md:text-sm text-base-content/70">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Fraud vendors automatically filtered out</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>Real-time advertised &amp; approved tickets</span>
              </div>
            </div>
          </div>

          {/* Hero visual / stats */}
          <div
            className="relative"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="150"
          >
            <div className="relative rounded-3xl bg-linear-to-tr from-slate-900 via-emerald-900/80 to-slate-900 border border-emerald-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.65)] p-5 md:p-7 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_55%)] pointer-events-none" />

              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300/80 mb-1">
                      Live overview
                    </p>
                    <p className="text-sm md:text-base font-semibold text-white">
                      Today&apos;s best tickets
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] md:text-xs bg-black/40 border border-white/10 text-emerald-100">
                    Updated in real-time
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="rounded-2xl bg-black/40 border border-emerald-400/20 px-3 py-3">
                    <p className="text-[11px] text-gray-300/80 mb-1">Approved Tickets</p>
                    <p className="text-xl md:text-2xl font-extrabold text-emerald-300">
                      {filteredLatestTickets.length}
                    </p>
                    <p className="text-[10px] text-emerald-200/80 mt-1">Showing latest picks</p>
                  </div>
                  <div className="rounded-2xl bg-black/30 border border-cyan-400/20 px-3 py-3">
                    <p className="text-[11px] text-gray-300/80 mb-1">Advertised Deals</p>
                    <p className="text-xl md:text-2xl font-extrabold text-cyan-300">
                      {filteredAdTickets.length}
                    </p>
                    <p className="text-[10px] text-cyan-200/80 mt-1">Popular right now</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-300/80">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>We highlight only trusted vendors for every journey.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to book a ticket section */}
      <section className="mt-10 md:mt-14">
        <div className="bg-base-100 rounded-2xl shadow-lg md:shadow-xl border border-base-300 px-4 md:px-8 py-6 md:py-8 max-w-4xl mx-auto">
          <h2
            data-aos="zoom-in"
            data-aos-duration="900"
            className="text-xl md:text-3xl font-bold text-center text-base-content mb-2"
          >
            How to book a ticket
          </h2>
          <p className="text-sm md:text-base text-base-content/70 text-center mb-6 md:mb-8">
            Follow these simple steps to find a verified ticket and confirm your journey in just a
            few clicks.
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Step 1 */}
            <div
              className="flex flex-col gap-3 bg-base-200 rounded-xl p-4 md:p-5 border border-base-300/80 hover:border-emerald-200 hover:bg-base-300 transition duration-200"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center justify-center text-xs md:text-sm">
                  1
                </span>
                <p className="font-semibold text-base-content text-sm md:text-base">
                  Browse &amp; compare tickets
                </p>
              </div>
              <p className="text-xs md:text-sm text-base-content/70 pl-11">
                Go to the{' '}
                <Link to="/all-tickets" className="text-emerald-600 font-medium underline">
                  Tickets
                </Link>{' '}
                page, filter by route or date, and pick a ticket that fits your schedule and budget.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="flex flex-col gap-3 bg-base-200 rounded-xl p-4 md:p-5 border border-base-300/80 hover:border-emerald-200 hover:bg-base-300 transition duration-200"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center justify-center text-xs md:text-sm">
                  2
                </span>
                <p className="font-semibold text-base-content text-sm md:text-base">
                  Check details &amp; vendor status
                </p>
              </div>
              <p className="text-xs md:text-sm text-base-content/70 pl-11">
                Open the ticket to review seat type, departure time, price, and make sure the vendor
                is not marked as fraud by our system.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="flex flex-col gap-3 bg-base-200 rounded-xl p-4 md:p-5 border border-base-300/80 hover:border-emerald-200 hover:bg-base-300 transition duration-200"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center justify-center text-xs md:text-sm">
                  3
                </span>
                <p className="font-semibold text-base-content text-sm md:text-base">
                  Confirm booking &amp; payment
                </p>
              </div>
              <p className="text-xs md:text-sm text-base-content/70 pl-11">
                Proceed with the booking flow, complete your payment securely, and get your ticket
                details instantly in your TicketBari account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement section */}
      {filteredAdTickets.length !== 0 && (
        <div className="bg-base-100/60 shadow-xl border border-base-300/40 px-3 md:px-10 py-5 md:pb-10 mt-5 rounded-lg backdrop-blur-sm">
          <h2 data-aos="zoom-in" className="text-xl md:text-3xl font-bold text-center mb-5">
            Popular Tickets
          </h2>

          <Swiper
            data-aos="fade-up"
            data-aos-duration="1000"
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            grabCursor
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.popular-pagination',
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {filteredAdTickets.map((ticket, index) => (
              <SwiperSlide key={ticket._id}>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay={index * 250}>
                  <TicketCard ticket={ticket} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Pagination dots */}
          <div className="popular-pagination flex justify-center mt-3" />
        </div>
      )}

      {/* Latest Tickets section */}
      <div
        id="latest-tickets"
        className="bg-base-100/60 shadow-xl border border-base-300/40 px-3 md:px-10 py-5 md:pb-10 mt-15 rounded-lg backdrop-blur-sm"
      >
        <h2 data-aos="zoom-in" className="text-xl md:text-3xl font-bold text-center mb-5">
          Latest Tickets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredLatestTickets.map((ticket, index) => (
            <div
              key={ticket._id}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 250}
            >
              <TicketCard ticket={ticket} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-5">
        <div data-aos="fade-down" data-aos-duration="1000">
          <Link
            to="/all-tickets"
            className="btn bg-[#086c52] text-white hover:scale-105 transition duration-300 active:scale-95"
          >
            Explore More Tickets
          </Link>
        </div>
      </div>

      {/* Other sections */}
      <PopularRoutes />
      <WhyChooseUs />
    </div>
  )
}

export default Home
