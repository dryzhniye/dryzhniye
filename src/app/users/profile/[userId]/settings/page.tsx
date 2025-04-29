'use client'
import React, { useEffect } from 'react'
import TabsComponent from '@/shared/ui/base/Tabs/Tabs'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/lib/const/PATH'
import { useProfileOwnerCheck } from '@/shared/lib/hooks/useProfileOwnerCheck'
import { useProfileTabs } from '@/app/users/profile/[userId]/settings/useProfileTabs'
import { validateProfilePart } from '@/shared/lib/utils/validateProfilePart'

type TabPart = 'info' | 'devices' | 'subscriptions' | 'payments'

const SettingsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()

  const userId = params?.userId as string
  const currentPart = searchParams.get('part') as TabPart | null
  const { isLoading } = useProfileOwnerCheck(userId)
  const tabs = useProfileTabs()

  useEffect(() => {
    if (userId && (!currentPart || !validateProfilePart(currentPart))) {
      router.replace(PATH.USERS.PROFILE_SETTINGS(Number(userId)) + '?part=info')
    }
  }, [currentPart, userId, router])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div style={{ minHeight: '100vh', padding: '36px 24px' }}>
      <TabsComponent
        tabs={tabs}
        urlParamName="part"
        defaultValue="info"
      />
    </div>
  )
}

export default SettingsPage