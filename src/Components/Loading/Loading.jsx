import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useState } from 'react'

const Loading = () => {
  // const [theme] = useState(() => {
  //   const savedTheme = localStorage.getItem('theme')

  //   return savedTheme || 'light'
  // })

  // console.log(theme)

  return (
    <div className="h-screen grid place-items-center">
      <DotLottieReact
        className="md:w-200 w-100"
        // src="https://lottie.host/0e8f1f00-4cd7-4f4b-ac71-5ad83c188ba7/3xAYwgz7n0.lottie"
        src="/Loading Animation.lottie"
        loop
        autoplay
      />
    </div>
  )
}

export default Loading
