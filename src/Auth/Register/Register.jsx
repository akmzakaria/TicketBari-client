import React from 'react'
import { useForm } from 'react-hook-form'

const Register = () => {
  const { register, handleSubmit } = useForm()

  const handleRegister = (data) => {
    const name = data.name
    const email = data.email
    const password = data.password
    console.log(name, email, password)
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleRegister)}>
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  className="input w-70"
                  placeholder="Enter your name"
                />

                {/* email */}
                <label className="label">Email</label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="input w-70"
                  placeholder="Enter your email"
                />

                {/* password */}
                <label className="label">Password</label>
                <input
                  {...register('password', { required: true })}
                  type="password"
                  className="input w-70"
                  placeholder="Enter your password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
