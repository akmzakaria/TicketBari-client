import React, { useEffect, useState, use } from 'react'
import ReactPaginate from 'react-paginate'
import { AuthContext } from '../../Context/AuthContext'
import Loading from '../Loading/Loading'
import TicketCard from '../TicketCard/TicketCard'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const AllTickets = () => {
  const { loading } = use(AuthContext)
  const instance = useAxiosSecure()

  const [showLoading, setShowLoading] = useState(true)

  const [fromSearch, setFromSearch] = useState('')
  const [toSearch, setToSearch] = useState('')
  const [transportFilter, setTransportFilter] = useState('all')
  const [sortPrice, setSortPrice] = useState('default')

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 6

  // get fraud users
  const { data: fraudUser = [] } = useQuery({
    queryKey: ['users', 'fraud'],
    queryFn: async () => {
      const res = await instance.get('/users?role=fraud')
      return res.data
    },
  })

  // get all approved tickets
  const { data: tickets = [] } = useQuery({
    queryKey: ['all-tickets', 'approved'],
    queryFn: async () => {
      const res = await instance.get('/tickets?ticketStatus=approved')
      return res.data
    },
  })

  const filteredAndSortedTickets = tickets
    .filter((ticket) => {
      const isFraud = fraudUser.some((user) => user.userEmail === ticket.vendor_email)
      return !isFraud
    })
    .filter((ticket) => {
      const fromMatch = ticket.from.toLowerCase().includes(fromSearch.toLowerCase())
      const toMatch = ticket.to.toLowerCase().includes(toSearch.toLowerCase())
      const transportMatch = transportFilter === 'all' ? true : ticket.transport === transportFilter
      return fromMatch && toMatch && transportMatch
    })
    .sort((a, b) => {
      if (sortPrice === 'lowToHigh') return a.price - b.price
      if (sortPrice === 'highToLow') return b.price - a.price
      return 0
    })

  const endOffset = itemOffset + itemsPerPage
  const currentItems = filteredAndSortedTickets.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(filteredAndSortedTickets.length / itemsPerPage)

  useEffect(() => {
    setItemOffset(0)
  }, [fromSearch, toSearch, transportFilter, sortPrice])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredAndSortedTickets.length
    setItemOffset(newOffset)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading || showLoading) return <Loading />

  return (
    <div className="min-h-screen  pb-10">
      {/* search */}
      <div className="">
        <div className="max-w-350 mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Find Tickets</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`btn btn-sm btn-circle ${
                isFilterOpen ? 'bg-[#086c52] text-white' : 'btn-ghost'
              } border border-gray-200`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="From"
                value={fromSearch}
                onChange={(e) => setFromSearch(e.target.value)}
                className="input input-sm input-bordered w-full pl-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              />
              <svg
                className="absolute left-2.5 top-2 text-gray-400"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span className="text-gray-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="To"
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                className="input input-sm input-bordered w-full pl-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <svg
                className="absolute left-2.5 top-2 text-gray-400"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>

          {/* filtering */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isFilterOpen ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className=" p-3 rounded-lg border border-gray-100 space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Transport Mode</p>
                <div className="flex gap-2">
                  {['all', 'Bus', 'Train', 'Flight'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTransportFilter(mode)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        transportFilter === mode
                          ? 'bg-[#086c52] text-white border-[#086c52]'
                          : 'bg-white text-gray-600'
                      }`}
                    >
                      {mode === 'all' ? 'All' : mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs font-semibold text-gray-500 uppercase">Sort By</p>
                <select
                  value={sortPrice}
                  onChange={(e) => setSortPrice(e.target.value)}
                  className="select select-bordered select-xs"
                >
                  <option value="default">Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">
            Showing {currentItems.length} of {filteredAndSortedTickets.length} tickets
          </span>
        </div>

        {filteredAndSortedTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-lg font-semibold text-gray-700">No tickets found</h3>
            <button
              onClick={() => {
                setFromSearch('')
                setToSearch('')
                setTransportFilter('all')
              }}
              className="btn btn-link text-[#086c52] mt-2"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>

            {/* pagination */}
            <div className="mt-12 flex justify-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next →"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="← Prev"
                renderOnZeroPageCount={null}
                containerClassName="flex items-center gap-2 select-none"
                pageClassName="inline-block"
                pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md hover:cursor-pointer transition-colors text-sm font-medium"
                previousClassName="inline-block"
                previousLinkClassName="px-4 py-2 border hover:cursor-pointer border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium"
                nextClassName="inline-block"
                nextLinkClassName="px-4 py-2 border hover:cursor-pointer border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium"
                activeLinkClassName="bg-[#086c52] text-white border-[#086c52] hover:bg-[#065a44]"
                disabledLinkClassName="text-gray-300 cursor-not-allowed hover:bg-white"
                breakLinkClassName="px-3 py-2 text-gray-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AllTickets
