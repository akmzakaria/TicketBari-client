import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { AuthContext } from '../../../../Context/AuthContext'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'

const EditTicket = () => {
  const { id } = useParams()
  const instance = useAxiosSecure()

  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      const res = await instance.get('/tickets')
      return res.data
    },
  })

  const ticket = tickets.find((t) => t._id === id)
  //   console.log(ticket)

  const { user } = use(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    // later: upload image to imgbb, then send data to backend

    const res = await instance.patch(`/tickets/${id}`, data)
    if (res.data.modifiedCount) {
      toast.success('Ticket updated successfully')
    }
    console.log(res.data)

    return res.data
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={true}></Toaster>
      <h2 className="text-3xl font-bold my-6">Edit Ticket</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Ticket title */}
        <div>
          <label className="label">Ticket Title</label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="input input-bordered w-full"
            defaultValue={ticket?.title}
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
              defaultValue={ticket?.from}
            />
            {errors.from?.type === 'required' && <span className="text-red-600">Required</span>}
          </div>

          <div>
            <label className="label">To</label>
            <input
              {...register('to', { required: true })}
              type="text"
              className="input input-bordered w-full"
              defaultValue={ticket?.to}
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
            defaultValue={ticket?.transport}
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
              defaultValue={ticket?.price}
            />
            {errors.price?.type === 'required' && <span className="text-red-600">Required</span>}
          </div>

          <div>
            <label className="label">Ticket Quantity</label>
            <input
              {...register('quantity', { required: true })}
              type="number"
              className="input input-bordered w-full"
              defaultValue={ticket?.quantity}
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
            defaultValue={ticket?.departure}
          />
          {errors.departure?.type === 'required' && <span className="text-red-600">Required</span>}
        </div>

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
                  //   defaultChecked={ticket?.perks}
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
        <button className="btn btn-primary w-full">Update Ticket</button>
      </form>
    </div>
  )
}

export default EditTicket
