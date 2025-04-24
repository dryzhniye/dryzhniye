'use client'
import React, { useEffect, useMemo } from 'react'
import TabsComponent, { type Tab } from '@/shared/ui/base/Tabs/Tabs'
import { GeneralInfo } from '@/shared/ui/GeneralInfo/GeneralInfo'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useMeQuery } from '@/shared/api/authApi'
import { PATH } from '@/shared/lib/const/PATH'
import { AccountManagement } from '@/shared/ui/AccountManagement/AccountManagement'
import { MyPayments } from '@/shared/ui/MyPayments/MyPayments'

type TabPart = 'info' | 'devices' | 'subscriptions' | 'payments'

const UserProfilePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const { data, isLoading, error } = useMeQuery()

  const userId = params?.userId as string
  const currentPart = searchParams.get('part') as TabPart | null

  useEffect(() => {
    if (userId && !isLoading) {
      const isProfileOwner = +userId === data?.userId
      if (!isProfileOwner || error) {
        router.push(PATH.AUTH.LOGIN)
      }
    }
  }, [userId, isLoading, data, error, router])

  useEffect(() => {
    if (userId && (!currentPart || !['info', 'devices', 'subscriptions', 'payments'].includes(currentPart))) {
      router.replace(PATH.USERS.PROFILE_SETTINGS(Number(userId)) + '?part=info')
    }
  }, [currentPart, userId, router])

  const tabs = useMemo(() => {
    return [
      {
        id: 'info',
        title: 'General information',
        content: <GeneralInfo />,
      },
      {
        id: 'devices',
        title: 'Devices',
        content: <div>Devices management</div>,
      },
      {
        id: 'subscriptions',
        title: 'Account Management',
        content: <AccountManagement />,
      },
      {
        id: 'payments',
        title: 'My payments',
        content: <MyPayments/>,
        // disabled: true,
      },
    ] satisfies Tab[]
  }, [])

  return isLoading ? (
    '...Loading'
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

export default UserProfilePage