import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../Loading/Loading'
import { FaClock, FaLock, FaTicketAlt, FaUsers } from 'react-icons/fa'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'
import { Link } from 'react-router'

const About = () => {
  const { loading } = use(AuthContext)
  const [showLoading, setShowLoading] = useState(true)

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
      <div className="max-w-350 px-5 mx-auto my-10">
        {/* Hero Section */}
        <section className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We make ticket booking simple, fast, and reliable for everyone.
          </p>
        </section>

        {/* Who We Are */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            We are a modern e-ticketing platform designed to help travelers book transport tickets
            easily and securely. Whether you are traveling for work, family, or adventure, our
            platform connects you with trusted vendors and verified routes in just a few clicks.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-14">
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to simplify the ticket booking experience by providing a fast,
              transparent, and user-friendly platform for both travelers and vendors.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              We aim to become a trusted digital travel partner by offering reliable services,
              competitive prices, and continuous innovation in the e-ticketing space.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs></WhyChooseUs>

        {/* Call To Action */}
        <section className="text-center bg-base-200 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-3">Start Your Journey With Us</h2>
          <p className="text-gray-600 mb-5">
            Discover routes, compare prices, and book your tickets today.
          </p>
          <Link to={'/all-tickets'} className="btn btn-primary">
            Explore Tickets
          </Link>
        </section>
      </div>
    </div>
  )
}

export default About
