import React, { use, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../../Context/AuthContext'
import useAxios from '../../../../Hooks/useAxios'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import toast, { Toaster, ToastIcon } from 'react-hot-toast'
import Aos from 'aos'

const AddTicket = () => {
  const { user } = use(AuthContext)
  const axios = useAxios()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const instance = useAxiosSecure()

  const onSubmit = (data) => {
    // console.log(data)

    // upload image to imgbb
    // console.log(data.image[0])

    const ticketImg = data.image[0]
    const formData = new FormData()
    formData.append('image', ticketImg)

    const imgAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`

    axios.post(imgAPI_URL, formData).then((res) => {
      const photoURL = res.data.data.url
      // console.log('after image upload', photoURL)
      const allData = {
        ...data,
        image: photoURL,
      }

      instance.post('/tickets', allData).then((res) => {
        if (res.status) {
          toast.success('Ticket request sent!', {
            position: 'top-center',
          })
          reset()
        }
        // console.log(res.status)
        return res.data
      })
    })
  }

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={true}></Toaster>
      <h2 data-aos="fade-down" className="text-xl md:text-3xl font-bold mb-6">
        Add New Ticket
      </h2>

      <form data-aos="fade-in" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Ticket title */}
        <div>
          <label className="label">Ticket Title</label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Dhaka to Chittagong Bus"
          />
          {errors.title?.type === 'required' && <span className="text-red-600">Required</span>}
        </div>

        {/* From & To */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">From</label>
            <input
              {...register('from', { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Dhaka"
            />
            {errors.from?.type === 'required' && <span className="text-red-600">Required</span>}
          </div>

          <div>
            <label className="label">To</label>
            <input
              {...register('to', { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Chittagong"
            />
            {errors.to?.type === 'required' && <span className="text-red-600">Required</span>}
          </div>
        </div>

        {/* Transport type */}
        <div>
          <label className="label">Transport Type</label>
          <select
            {...register('transport', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select type</option>
            <option>Bus</option>
            <option>Train</option>
            <option>Launch</option>
            <option>Flight</option>
          </select>
          {errors.transport?.type === 'required' && <span className="text-red-600">Required</span>}
        </div>

        {/* Price & Quantity */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Price (per unit)</label>
            <input
              {...register('price', { required: true })}
              type="number"
              className="input input-bordered w-full"
              placeholder="1200"
            />
            {errors.price?.type === 'required' && <span className="text-red-600">Required</span>}
          </div>

          <div>
            <label className="label">Ticket Quantity</label>
            <input
              {...register('quantity', { required: true })}
              type="number"
              className="input input-bordered w-full"
              placeholder="40"
            />
            {errors.quantity?.type === 'required' && <span className="text-red-600">Required</span>}
          </div>
        </div>

        {/* Departure date & time */}
        <div>
          <label className="label">Departure Date & Time</label>
          <input
            {...register('departure', { required: true })}
            type="datetime-local"
            className="input input-bordered w-full"
          />
          {errors.departure?.type === 'required' && <span className="text-red-600">Required</span>}
        </div>

        {/* Perks */}
        {/* <div>
          <label className="label">Perks</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(
                  'perks',
                  {
                    validate: (value) => value.length > 0 || 'Select at least one perk',
                  },
                  { required: true }
                )}
                value="AC"
              />
              AC
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(
                  'perks',
                  {
                    validate: (value) => value.length > 0 || 'Select at least one perk',
                  },
                  { required: true }
                )}
                value="Breakfast"
              />
              Breakfast
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(
                  'perks',
                  {
                    validate: (value) => value.length > 0 || 'Select at least one perk',
                  },
                  { required: true }
                )}
                value="WiFi"
              />
              WiFi
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(
                  'perks',
                  {
                    validate: (value) => value.length > 0 || 'Select at least one perk',
                  },
                  { required: true }
                )}
                value="None"
              />
              None
            </label>
            {errors.perks?.type === 'required' && <span className="text-error">Required</span>}
          </div>
        </div> */}

        {/* fixed perks */}
        <div>
          <label className="label">Perks</label>

          <div className="flex flex-wrap gap-4">
            {['AC', 'Breakfast', 'WiFi', 'None'].map((perk) => (
              <label key={perk} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={perk}
                  {...register('perks', {
                    validate: (value) => value?.length > 0 || 'Select at least one perk',
                  })}
                />
                {perk}
              </label>
            ))}
          </div>

          {errors.perks && <p className="text-red-600 mt-1">{errors.perks.message}</p>}
        </div>

        {/* Image upload */}
        {/* Image will be uploaded to imgbb */}
        <div>
          <label className="label">Ticket Image</label>
          <input
            {...register('image', { required: true })}
            type="file"
            className="file-input file-input-bordered w-full"
          />
          {errors.image?.type === 'required' && <span className="text-red-600">Required</span>}
        </div>

        {/* Vendor info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Vendor Name</label>
            <input
              {...register('vendor_name')}
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered w-full "
            />
          </div>

          <div>
            <label className="label">Vendor Email</label>
            <input
              {...register('vendor_email')}
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
        </div>

        {/* Submit */}
        <button className="btn text-white bg-[#086c52] w-full">Add Ticket</button>
      </form>
    </div>
  )
}

export default AddTicket
