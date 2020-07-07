/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'

interface UseIntersectionObserver {
  root?: Element | null
  target: Element | null
  onIntersect: any
  threshold?: number | number[]
  rootMargin?: string
}
const useIntersectionObserver = ({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}: UseIntersectionObserver) => {
  useEffect(() => {
    if (!target) {
      return
    }

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    })

    observer.observe(target)

    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(target)
    }
  }, [target, root, onIntersect, rootMargin, threshold])
}

export default useIntersectionObserver