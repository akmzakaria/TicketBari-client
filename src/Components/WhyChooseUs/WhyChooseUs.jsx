import Aos from 'aos'
import { useEffect } from 'react'
import { FaTicketAlt, FaLock, FaClock, FaHeadset } from 'react-icons/fa'

const features = [
  {
    id: 1,
    icon: <FaTicketAlt />,
    title: 'Easy Booking',
    desc: 'Book tickets in just a few clicks',
  },
  {
    id: 2,
    icon: <FaLock />,
    title: 'Secure Payment',
    desc: 'Your payments are fully protected',
  },
  {
    id: 3,
    icon: <FaClock />,
    title: '24/7 Availability',
    desc: 'Book tickets anytime, anywhere',
  },
  {
    id: 4,
    icon: <FaHeadset />,
    title: 'Customer Support',
    desc: 'We are always here to help you',
  },
]

const WhyChooseUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    })
  }, [])

  return (
    <section className="my-14">
      <h2 data-aos="zoom-in" className="text-3xl font-bold mb-8 text-center">
        Why Choose Us?
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div className="  rounded-xl bg-white transition-all duration-500 ease-in-out hover:scale-110 hover:transform-[perspective(1000px)_rotateX(10deg)_rotateY(-10deg)_rotateZ(2deg)] hover:shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] will-change-transform backface-hidden">
            <div
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
              data-aos-delay={index * 350}
              key={item.id}
              className="text-center p-6 shadow-md rounded-xl"
            >
              <div className="text-3xl text-[#086c52] mb-3 mx-auto">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUs
