import React, { use, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router'
import useAxios from '../../Hooks/useAxios'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import Aos from 'aos'

const Register = () => {
  const instance = useAxiosSecure()
  const navigate = useNavigate()
  const location = useLocation()
  const { registerUser, updateUserProfile, googleLogin } = use(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  const handleRegister = (data) => {
    const name = data.name
    const email = data.email
    const password = data.password
    const photo = data.photo
    // console.log(name, email, password)

    registerUser(email, password).then(() => {
      //   console.log(res)
      const userInfo = {
        userName: name,
        photoURL: photo,
        userEmail: email,
        role: 'user',
      }

      instance
        .post('/users', userInfo)
        .then((res) => {
          toast.success('Registered successfully!', {
            position: 'top-center',
          })
        })
        .catch(() => {
          toast.error('Register unsuccessful! Try again.', {
            position: 'top-center',
          })
        })
      navigate(location?.state || '/')

      const profile = {
        displayName: name,
        photoURL: photo,
        userEmail: email,
      }

      updateUserProfile(profile)
    })
  }

  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      //   console.log(res.user)
      const profile = {
        userName: res.user.displayName,
        photoURL: res.user.photoURL,
        userEmail: res.user.email,
        role: 'user',
      }
      instance
        .post('/users', profile)
        .then((res) => {
          navigate(location?.state || '/')
          toast.success('Logged in successfully!', {
            position: 'top-center',
          })
        })
        .catch(() => {
          toast.error('Logged in unsuccessful! Try again.', {
            position: 'top-center',
          })
        })
    })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div data-aos="zoom-in-up" className="hero-content flex-col">
        {/* <div className="text-center lg:text-left">
          <h1 className="text-xl md:text-3xl font-bold">Register now!</h1>
        </div> */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-xl mt-5 text-center md:text-3xl font-bold">Register now!</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleRegister)}>
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  //   name="name"
                  className="input w-70"
                  placeholder="Enter your name"
                />
                {errors.name?.type === 'required' && (
                  <span className="text-red-600">Name is required!</span>
                )}

                {/* photoURL */}
                <label className="label">PhotoURL</label>
                <input
                  {...register('photo', { required: false })}
                  type="text"
                  className="input w-70"
                  placeholder="Enter your photoURL"
                />

                {/* email */}
                <label className="label">Email</label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="input w-70"
                  placeholder="Enter your email"
                />
                {errors.email?.type === 'required' && (
                  <span className="text-red-600">Email is required!</span>
                )}

                {/* password */}
                <label className="label">Password</label>
                <input
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                  })}
                  type="password"
                  className="input w-70"
                  placeholder="Enter your password"
                />

                {errors.password?.type === 'required' && (
                  <span className="text-red-600">Password is required!</span>
                )}

                {errors.password?.type === 'minLength' && (
                  <span className="text-red-600">Must be at least 6 characters</span>
                )}

                {errors.password?.type === 'pattern' && (
                  <span className="text-red-600">
                    {' '}
                    Must include uppercase, lowercase, number, and special character
                  </span>
                )}

                <button className="btn bg-[#086c52] hover:bg-[#064e3b] text-white mt-4">
                  Register
                </button>
              </fieldset>
            </form>
            {/* google */}
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            <span>
              Already have an account?{' '}
              <Link className="text-[#086c52] hover:text-[#064e3b] underline" to={'/login'}>
                Login now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
