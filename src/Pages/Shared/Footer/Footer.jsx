import React from 'react'
import { Link } from 'react-router'
import Logo from '../../../Components/Logo/Logo'
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <div className="bg-[#021b14] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Logo />
          <p className="text-sm mt-2">Book bus, train, launch & flight tickets easily.</p>
        </div>

        {/* Quick Links */}
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

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@TicketGhor.com</li>
            <li>Phone: +880123456789</li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-gray-800 transition hover:bg-[#1877F2]"
            >
              <FaFacebookF size={16} className="text-white" />
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="p-2 rounded-full bg-gray-800 transition hover:bg-black"
            >
              <FaXTwitter size={16} className="text-white" />
            </a>

            {/* Gmail */}
            <a
              href="mailto:support@TicketGhor.com"
              aria-label="Gmail"
              className="p-2 rounded-full bg-gray-800 transition hover:bg-[#EA4335]"
            >
              <MdEmail size={18} className="text-white" />
            </a>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h3 className="text-white font-semibold mb-3">Payment Methods</h3>
          <div className="flex items-center gap-3">
            <img src="/Stripe.svg" alt="Stripe" className="h-8 w-24 bg-white p-1 rounded" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        &copy; 2025 TicketGhor. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
