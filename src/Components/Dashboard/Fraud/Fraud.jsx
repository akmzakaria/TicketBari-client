import React, { use, useMemo } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import toast from 'react-hot-toast'

const Fraud = () => {
  const { logOut } = use(AuthContext)
  const handleLogout = () => {
    logOut().then(() => {
      toast.success('successfully logged out!', {
        position: 'top-center',
      })
    })
  }

  const caseId = useMemo(() => Math.floor(Math.random() * 1000000), [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header with Lock Icon */}
        <div className="bg-red-600 p-6 flex justify-center">
          <svg
            className="h-16 w-16 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div className="px-8 py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Suspended</h2>
          <p className="text-gray-600 mb-6">
            Your vendor account has been flagged for violation of our Terms of Service regarding
            fraudulent activity.
          </p>

          {/* Technical Details Box */}
          <div className="bg-gray-100 rounded border border-gray-300 p-4 mb-6 text-sm text-left">
            <p className="font-mono text-gray-700">
              <strong>Status:</strong>{' '}
              <span className="text-red-600 font-bold">PERMANENTLY RESTRICTED</span>
            </p>
            <p className="font-mono text-gray-700 mt-1">
              <strong>Reason:</strong> Policy Violation #404-F
            </p>
            <p className="font-mono text-gray-700 mt-1">
              <strong>Case ID:</strong> Ref-{caseId}
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-8">
            Access to your dashboard, funds, and product listings has been revoked effective
            immediately.
          </p>

          <div className="flex flex-col space-y-3">
            <a
              href="mailto:compliance@yourplatform.com"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Contact Compliance Team
            </a>

            <button
              onClick={handleLogout}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fraud
