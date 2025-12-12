import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [direction, setDirection] = useState('up')
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      if (currentY > lastY) {
        setDirection('down') // scrolling down
      } else if (currentY < lastY) {
        setDirection('up') // scrolling up
      }

      setLastY(currentY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  return direction
}
