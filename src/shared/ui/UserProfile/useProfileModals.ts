import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useProfileModals = (initialPostId?: string | number) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const action = searchParams.get('action')
  const postIdFromParams = searchParams.get('postId')

  const [postId, setPostId] = useState<string | number | undefined>(
    postIdFromParams ? postIdFromParams : initialPostId
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (postIdFromParams) {
      setPostId(postIdFromParams)
    } else if (!postIdFromParams && postId) {
      setPostId(undefined)
    }
  }, [postIdFromParams])

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
    setPostId(undefined)

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