import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState({})
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const quantity = searchParams.get('quantity')
  const bookingQty = searchParams.get('bookingQty')
  // console.log(sessionId)

  const instance = useAxiosSecure()

  useEffect(() => {
    instance.patch(`/payment-success?session_id=${sessionId}`).then((res) => {
      console.log(res.data)
      setPaymentInfo({
        transactionId: res.data.transactionId,
      })
      // instance.patch('/tickets')
    })
  }, [])

  return (
    <div className="p-5">
      <h2 className="text-3xl">Payment successful</h2>
      <p>Your Transaction id: {paymentInfo.transactionId}</p>
      <Link to={'/dashboard/booked-tickets'} className="btn btn-sm mt-3">
        Return Dashboard
      </Link>
    </div>
  )
}

export default PaymentSuccess
