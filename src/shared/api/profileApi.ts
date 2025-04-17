import { baseApi } from '@/store/services/baseApi'
import type { SettingsForm } from '@/shared/lib/schemas/settingsSchema'
import type { GetProfileResponse } from '@/shared/lib/types/profileTypes'


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
  }),
})

export const { useUpdateProfileMutation, useGetProfileQuery} = profileApi
