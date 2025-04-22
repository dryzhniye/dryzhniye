import { baseApi } from '@/store/services/baseApi'
import type { SettingsForm } from '@/shared/lib/schemas/settingsSchema'
import { AvatarResponse, GetProfileResponse } from '@/shared/lib/types/profileTypes'


export const profileApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    updateProfile: build.mutation<void, SettingsForm>({
      query: (body) => ({
        url: 'users/profile',
        method: 'PUT',
        body,
      }),
      // invalidatesTags: ['Profile'],
    }),
    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: 'users/profile',
      }),
    }),
    setAvatar: build.mutation<AvatarResponse, { file: File }>({
      invalidatesTags: ['Profile'],
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: `users/profile/avatar`,
        }
      },
    }),
  }),
})

export const { useUpdateProfileMutation, useGetProfileQuery, useSetAvatarMutation } = profileApi
