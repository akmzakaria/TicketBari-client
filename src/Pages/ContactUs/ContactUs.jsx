import React, { use, useEffect, useState } from 'react'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../../Components/Loading/Loading'
import Aos from 'aos'
import 'aos/dist/aos.css'

const ContactUs = () => {
  const { loading } = use(AuthContext)
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    Aos.init({ duration: 800, once: true, easing: 'ease-in-out' })
  }, [])

  if (loading || showLoading) return <Loading />

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! Your message has been sent.')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div data-aos="fade-down" className="text-center mb-16">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-500">
            Have questions about your ticket? We're here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-8">
            <div className="rounded-xl  transition-all duration-500 ease-in-out hover:scale-105 hover:transform-[perspective(1000px)_rotateX(10deg)_rotateY(-10deg)_rotateZ(2deg)] hover:shadow-[-6px_6px_15px_rgba(0,0,0,0.25)] will-change-transform backface-hidden">
              <div
                data-aos="fade-right"
                data-aos-delay="100"
                className="p-8 rounded-xl shadow-md flex items-start space-x-4"
              >
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  <HiOutlinePhone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Call Us</h3>
                  <p className="text-gray-500">Fastest way to get help during travel.</p>
                  <p className="mt-2 font-semibold text-blue-600">+880 1234 567 890</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl  transition-all duration-500 ease-in-out hover:scale-110 hover:transform-[perspective(1000px)_rotateX(10deg)_rotateY(-10deg)_rotateZ(2deg)] hover:shadow-[-6px_6px_15px_rgba(0,0,0,0.25)] will-change-transform backface-hidden">
              <div
                data-aos="fade-right"
                data-aos-delay="250"
                className="p-8 rounded-xl shadow-md flex items-start space-x-4"
              >
                <div className="bg-green-100 p-3 rounded-lg text-green-600">
                  <HiOutlineMail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Email Support</h3>
                  <p className="text-gray-500">For booking inquiries and receipts.</p>
                  <p className="mt-2 font-semibold text-green-600">support@ticketgo.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl  transition-all duration-500 ease-in-out hover:scale-110 hover:transform-[perspective(1000px)_rotateX(10deg)_rotateY(-10deg)_rotateZ(2deg)] hover:shadow-[-6px_6px_15px_rgba(0,0,0,0.25)] will-change-transform backface-hidden">
              <div
                data-aos="fade-right"
                data-aos-delay="400"
                className="p-8 rounded-xl shadow-md flex items-start space-x-4"
              >
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                  <HiOutlineLocationMarker size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Head Office</h3>
                  <p className="text-gray-500">Visit us for corporate partnerships.</p>
                  <p className="mt-2 text-gray-500">123 Travel Road, Gulshan, Dhaka.</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              data-aos="fade-up"
              data-aos-delay="550"
              className="pt-6 flex space-x-6 justify-center lg:justify-start"
            >
              <a href="#" className="text-gray-400 hover:text-green-600">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left" data-aos-delay="300" className="p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="mt-1 block w-full px-4 py-3 bg-black/2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  className="mt-1 block w-full px-4 py-3 bg-black/2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <select className="mt-1 block w-full px-4 py-3 bg-black/2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                  <option className="text-black">Booking Issue</option>
                  <option className="text-black">Refund Request</option>
                  <option className="text-black">General Inquiry</option>
                  <option className="text-black">Report a Vendor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell us how we can help..."
                  className="mt-1 block w-full px-4 py-3 bg-black/2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#086c52] text-white font-bold py-3 px-6 rounded-md hover:bg-[#064e3b] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
