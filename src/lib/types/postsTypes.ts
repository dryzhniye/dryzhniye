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

export type GetProfilePostsParams = {
  userName: string
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface PostImage {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type CreatePostArgs = {
  description: string
  uploadIds: string[]
}

export type UploadPostImagesArgs = {
  files: File[]
}

export type UploadPostImagesResponse = {
  images: PostImage[]
}
