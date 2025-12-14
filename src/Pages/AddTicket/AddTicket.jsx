import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../Context/AuthContext'
import useAxios from '../../Hooks/useAxios'

const AddTicket = () => {
  const { user } = use(AuthContext)
  const { register, handleSubmit } = useForm()
  const instance = useAxios()

  const onSubmit = (data) => {
    console.log(data)
    // later: upload image to imgbb, then send data to backend

    instance.post('/tickets', data).then((res) => {
      console.log(res)
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Add New Ticket</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Ticket title */}
        <div>
          <label className="label">Ticket Title</label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Dhaka to Chittagong Bus"
          />
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
          </div>

          <div>
            <label className="label">To</label>
            <input
              {...register('to', { required: true })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Chittagong"
            />
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
          </div>

          <div>
            <label className="label">Ticket Quantity</label>
            <input
              {...register('quantity', { required: true })}
              type="number"
              className="input input-bordered w-full"
              placeholder="40"
            />
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
        </div>

        {/* Perks */}
        <div>
          <label className="label">Perks</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('perks')} value="AC" />
              AC
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('perks')} value="Breakfast" />
              Breakfast
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('perks')} value="WiFi" />
              WiFi
            </label>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="label">Ticket Image</label>
          <input
            {...register('image', { required: true })}
            type="file"
            className="file-input file-input-bordered w-full"
          />
          <p className="text-sm text-gray-500 mt-1">Image will be uploaded to imgbb</p>
        </div>

        {/* Vendor info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Vendor Name</label>
            <input
              {...register('vendor_name')}
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label">Vendor Email</label>
            <input
              {...register('vendor_email')}
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full">Add Ticket</button>
      </form>
    </div>
  )
}

export default AddTicket
