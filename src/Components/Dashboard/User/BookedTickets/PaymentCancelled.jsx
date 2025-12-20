import React from 'react'
import { Link } from 'react-router'

const PaymentCancelled = () => {
  return (
    <div className="p-5">
      <h2 className="text-3xl">Payment cancelled</h2>
      <Link to={'/dashboard/booked-tickets'} className="btn btn-sm mt-5">
        Try Again
      </Link>
    </div>
  )
}

export default PaymentCancelled
