import { baseApi } from '@/store/services/baseApi'
import type { SettingsForm } from '@/shared/lib/schemas/settingsSchema'


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
  }),
})

export const {

  useUpdateProfileMutation,

} = profileApi
