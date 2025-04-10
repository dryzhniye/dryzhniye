import { useCreatePostMutation, useUploadImagePostMutation, useUploadImagePostMutation } from '@/lib/api/postApi'

const [uploadImage] = useUploadImagePostMutation()
const [createPost] = useCreatePostMutation()

const handleCreatePost = async (file: File, description: string) => {
  const res = await uploadImage([file])
  const uploadId = res.data?.images[0]?.uploadId

  if (uploadId) {
    await createPost({
      description,
      childrenMetadata: [{ uploadId }]
    })
  }
}
