import React from 'react'
import { Link } from 'react-router'

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-5">
      <div className="text-center">
        <div className="relative inline-block">
          <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">404</h1>
          <div className="bg-green-600 px-2 text-sm rounded rotate-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            Page Not Found
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Lost your way?</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page or ticket you are looking for might have been moved, deleted, or never existed
            in the first place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition-all active:scale-95"
            >
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 opacity-50">
        <img src="/logo1.png" alt="Company Logo" className="h-10 mx-auto grayscale" />
      </div>
    </div>
  )
}

export default Error404
