import Aos from 'aos'
import { useEffect } from 'react'

const routes = [
  {
    id: 1,
    from: 'Dhaka',
    to: 'Chittagong',
    price: '৳1200',
    transport: 'Bus',
  },
  {
    id: 2,
    from: 'Dhaka',
    to: 'Sylhet',
    price: '৳950',
    transport: 'Bus',
  },
  {
    id: 3,
    from: 'Dhaka',
    to: 'Cox’s Bazar',
    price: '৳1500',
    transport: 'Bus',
  },
]

const PopularRoutes = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    })
  }, [])

  return (
    <section className="my-12">
      <h2 data-aos="zoom-in" className="text-3xl font-bold mb-6 text-center">
        Popular Routes
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {routes.map((route, index) => (
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1500"
            data-aos-delay={index * 350}
            key={route.id}
            className="border rounded-xl p-5 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">
              {route.from} → {route.to}
            </h3>

            <p className="text-sm mt-2">Starting from</p>
            <p className="text-xl font-bold text-[#086c52]">{route.price}</p>

            <p className="mt-2 text-sm text-gray-500">Transport: {route.transport}</p>

            <button className="btn btn-sm bg-[#086c52] text-white mt-4 w-full">View Tickets</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularRoutes
