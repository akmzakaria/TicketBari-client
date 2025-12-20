import { use } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const TransactionHistory = () => {
  const { user } = use(AuthContext)
  const axiosSecure = useAxiosSecure()

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`)
      return res.data
    },
  })

  return (
    <div>
      <h2 className="text-5xl my-5">Transaction History: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-center">
              <th>SI No</th>
              <th>Ticket Title</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i) => (
              <tr className="text-center" key={payment._id}>
                <th>{i + 1}</th>
                <td>{payment.title}</td>
                <td>{payment.amount} BDT</td>
                <td>
                  {new Date(payment.paidAt).toLocaleString('en-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionHistory
