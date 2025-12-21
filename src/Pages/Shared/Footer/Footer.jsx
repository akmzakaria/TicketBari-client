import React from 'react'
import Logo from '../../../Components/Logo/Logo'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className="bg-[#021b14] text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Logo></Logo>
          <p className="text-sm">Book bus, train, launch & flight tickets easily.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-tickets" className="hover:text-white">
                All Tickets
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className="hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@TicketGhor.com</li>
            <li>Phone: +880123456789</li>
            <li>
              <Link to="#" className="hover:text-white">
                Facebook Page
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Payment Methods</h3>
          <div className="flex items-center gap-3">
            <img src="/Stripe.svg" alt="Stripe" className="h-8 w-25 bg-white p-1 rounded" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        &copy; 2025 TicketGhor. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
