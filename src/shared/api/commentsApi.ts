import { baseApi } from '@/store/services/baseApi'
import { CommentsRequest, CommentType } from '@/shared/lib/types/commentTypes'

export const commentsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPostComments: build.query<CommentsRequest, number>({
      query: (postId) => `posts/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: 'Comments', id: postId },
      ],
    }),
    addComment: build.mutation<CommentType, { postId: number, content: string }>({
      query: ({ content, postId }) => {
        return {
          url: `posts/${postId}/comments`,
          method: 'POST',
          body: {
            content,
          },
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comments', id: arg.postId },
      ],
    }),
  }),
})

export const { useGetPostCommentsQuery, useAddCommentMutation } = commentsApi
