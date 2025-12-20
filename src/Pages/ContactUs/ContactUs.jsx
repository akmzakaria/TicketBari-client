import React from 'react'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic for sending email or saving message goes here
    alert('Thank you! Your message has been sent.')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-500">
            Have questions about your ticket? We're here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <HiOutlinePhone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Call Us</h3>
                <p className="text-gray-500">Fastest way to get help during travel.</p>
                <p className="mt-2 font-semibold text-blue-600">+880 1234 567 890</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <HiOutlineMail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Email Support</h3>
                <p className="text-gray-500">For booking inquiries and receipts.</p>
                <p className="mt-2 font-semibold text-green-600">support@ticketgo.com</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                <HiOutlineLocationMarker size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Head Office</h3>
                <p className="text-gray-500">Visit us for corporate partnerships.</p>
                <p className="mt-2 text-gray-700">123 Travel Road, Gulshan, Dhaka.</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 flex space-x-6 justify-center lg:justify-start">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Booking Issue</option>
                  <option>Refund Request</option>
                  <option>General Inquiry</option>
                  <option>Report a Vendor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell us how we can help..."
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
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
