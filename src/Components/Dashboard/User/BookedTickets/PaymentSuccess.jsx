import React from 'react'
import { Link } from 'react-router'

const PaymentSuccess = () => {
  return (
    <div className="p-5">
      <h2 className="text-3xl">Payment successful</h2>
      <p>Your Transaction id: </p>
      <Link to={'/dashboard'} className="btn btn-sm mt-3">
        Return Home
      </Link>
    </div>
  )
}

export default PaymentSuccess
