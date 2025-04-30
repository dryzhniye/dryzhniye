import { AccountManagementProvider } from '@/shared/ui/AccountManagement/AccountManagementContext'
import { useMemo } from 'react'
import { Tab } from '@/shared/ui/base/Tabs/Tabs'
import { GeneralInfo } from '@/shared/ui/GeneralInfo/GeneralInfo'
import { AccountManagement } from '@/shared/ui/AccountManagement/AccountManagement'
import { MyPayments } from '@/shared/ui/MyPayments/MyPayments'

export const useProfileTabs = () => {
  return useMemo(() => {
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
        content: (
          <AccountManagementProvider>
            <AccountManagement />
          </AccountManagementProvider>
        ),
      },
      {
        id: 'payments',
        title: 'My payments',
        content: <MyPayments />,
      },
    ] satisfies Tab[]
  }, [])
}
