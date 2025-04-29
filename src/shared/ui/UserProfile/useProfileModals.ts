import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useProfileModals = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const action = searchParams.get('action')
  const postId = searchParams.get('postId')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (action === 'create' && postId) {
      const url = new URL(window.location.href)
      url.searchParams.delete('action')
      window.history.replaceState(null, '', url.toString())
      setIsModalOpen(false)
    } else if (action === 'create') {
      setIsModalOpen(true)
    } else if (postId) {
      setIsModalOpen(false)
    } else {
      setIsModalOpen(false)
    }
  }, [action, postId])

  const closeModalsHandler = () => {
    setIsModalOpen(false)

    const params = new URLSearchParams(window.location.search)
    params.delete('postId')
    params.delete('action')
    const newUrl = `${window.location.pathname}?${params.toString()}`

    router.replace(newUrl)
  }

  return {
    isModalOpen,
    setIsModalOpen,
    closeModalsHandler,
    postId: postId ? Number(postId) : undefined,
  }
}