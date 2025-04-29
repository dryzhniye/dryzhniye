import { RefObject, useEffect } from 'react'

export const useInfiniteScroll = (
  loaderRef: RefObject<HTMLElement | null>,
  isLoading: boolean,
  hasMore: boolean,
  onLoadMore: () => void
) => {
  useEffect(() => {
    const loaderNode = loaderRef.current

    if (!loaderNode || isLoading || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            onLoadMore()
          }, 300)
        }
      },
      { threshold: 1 }
    )

    observer.observe(loaderNode)

    return () => {
      if (loaderNode) {
        observer.unobserve(loaderNode)
      }
    }
  }, [isLoading, hasMore, onLoadMore, loaderRef])
}