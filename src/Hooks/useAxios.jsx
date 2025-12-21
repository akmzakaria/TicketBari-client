import axios from 'axios'
import React from 'react'

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'https://ticketghor-akm.vercel.app',
  })

  return instance
}

export default useAxios
