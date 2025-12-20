import React from 'react'
import { Link } from 'react-router'

const TicketCard = ({ ticket }) => {
  const { _id, image, title, price, quantity, transport, perks } = ticket

  return (
    <div className="bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <img src="/logo1.png" alt={title} className="h-48 w-full object-cover" />

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="text-primary font-bold">
          ৳ {price} <span className="text-sm font-normal"></span>
        </p>

        <p className="text-sm text-gray-600">Quantity: {quantity}</p>

        <p className="text-sm">
          Transport: <span className="font-medium">{transport}</span>
        </p>

        {/* Perks */}
        <div className="flex gap-1">
          <p className="text-gray-600 text-sm">Perks:</p>
          <div className="flex flex-wrap gap-2">
            {perks.map((perk, index) => (
              <span
                key={index}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <Link to={`/ticket-details/${_id}`} className="btn btn-primary btn-sm w-full mt-3">
          See Details
        </Link>
      </div>
    </div>
  )
}

export default TicketCard
