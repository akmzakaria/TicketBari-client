import axios from 'axios'
import React from 'react'

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'https://ticket-bari-server-eta.vercel.app',
  })

  return instance
}

export default useAxios
