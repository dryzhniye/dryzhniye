type Author = {
  id: number
  username: string
  avatars: string[]
}

export type CommentType = {
  id: number
  postId: number
  from: Author
  content: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}

export type CommentsRequest = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: CommentType[]
}

