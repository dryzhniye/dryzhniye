'use client'

import React from 'react'
import { v1 } from 'uuid'
import TabsComponent, { type Tab } from '@/shared/ui/base/Tabs/Tabs'
import { GeneralInfo } from '@/shared/ui/GeneralInfo/GeneralInfo'
import { useProfile } from '@/shared/lib/contexts/ProfileContext'

const UserProfilePage = () => {

  const tabs: Tab[] = [
    {
      id: v1(),
      title: 'General information',
      content: <GeneralInfo/>,
    },
    {
      id: v1(),
      title: 'Devices',
      content: <div>This is your profile.</div>,
    },
    {
      id: v1(),
      title: 'Account Management',
      content: <div>Change your settings here.</div>,
      // disabled: true,
    },
    {
      id: v1(),
      title: 'My payments',
      content: <div>Change your settings here.</div>,
      disabled: true,
    },
  ]

  const profile = useProfile()

  console.log(profile)
  return (
    <div style={{minHeight: '100vh', padding: '36px 24px'}}>
      <TabsComponent tabs={tabs} defaultTab={tabs[0].id}/>
    </div>
  )
}

export default UserProfilePage