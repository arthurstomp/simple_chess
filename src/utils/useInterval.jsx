// Sources: 
// https://blog.bitsrc.io/polling-in-react-using-the-useinterval-custom-hook-e2bcefda4197
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function poll() {
      savedCallback.current()
    }

    if (delay !== null) {
      const interval = setInterval(poll, delay)
      return () => {
        clearInterval(interval)
      }
    }
  })
}
