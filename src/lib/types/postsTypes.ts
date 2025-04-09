export type PostImageType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type PostType = {
  id: number
  userName: string
  description: string
  location: string
  images: PostImageType[]
  createdAt: string
  updatedAt: string
  avatarOwner: string
  ownerId: number
  owner: {
    firstName: string,
    lastName: string
  },
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: string[]
}

export type getPublicPostsResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: PostType[]
}