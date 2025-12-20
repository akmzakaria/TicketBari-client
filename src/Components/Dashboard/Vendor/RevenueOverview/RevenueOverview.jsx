import React from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../../../Context/AuthContext'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { FaBangladeshiTakaSign } from 'react-icons/fa6'

const RevenueOverview = () => {
  const { user } = React.useContext(AuthContext)
  const instance = useAxiosSecure()

  const { data: stats = {} } = useQuery({
    queryKey: [user?.email, 'vendor-stats'],
    queryFn: async () => {
      const res = await instance.get(`/vendors/ticket-status?email=${user?.email}`)
      return res.data
    },
  })

  const { approvedTickets = 0, soldTickets = 0, actualRevenue = 0, totalRevenue = 0 } = stats

  const COLORS1 = ['#059669', '#064E3B']
  const COLORS2 = ['#086c52', '#34D399']

  // Pie chart data
  const ticketData = [
    { name: 'Total Added Tickets', value: approvedTickets },
    { name: 'Sold Tickets', value: soldTickets },
  ]

  const revenueData = [
    { name: 'Actual Revenue', value: actualRevenue },
    { name: 'Total Revenue', value: totalRevenue },
  ]

  return (
    <div className="flex items-center justify-center">
      <div>
        <h2 className="text-2xl my-5 font-bold">Revenue Overview</h2>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Stats */}
          <div className="stats stats-vertical lg:stats-horizontal shadow text-center md:h-35 ">
            <div className="stat">
              <div className="stat-title">Total Added Tickets</div>
              <div className="stat-value">{approvedTickets}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Sold Tickets</div>
              <div className="stat-value">{soldTickets}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Actual Revenue</div>
              <div className="stat-value flex justify-center items-center">
                <FaBangladeshiTakaSign />
                {actualRevenue}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Revenue</div>
              <div className="stat-value flex justify-center items-center">
                <FaBangladeshiTakaSign />
                {totalRevenue}
              </div>
            </div>
          </div>

          {/* Tickets Pie Chart */}
          <div className=" flex gap-5 flex-col md:flex-row">
            <div className="mb-10 flex justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={ticketData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  fill="#8884d8"
                  label
                >
                  {ticketData.map((entry, index) => (
                    <Cell key={`cell-ticket-${index}`} fill={COLORS2[index % COLORS2.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* Revenue Pie Chart */}
            <div className="flex justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  fill="#82ca9d"
                  label
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-revenue-${index}`} fill={COLORS1[index % COLORS1.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueOverview
