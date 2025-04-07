'use client'

import React from 'react'
import { useRedirectIfAuthorized } from '@/lib/hooks/useRedirectIfAuthorized'

const Hall = () => {
  useRedirectIfAuthorized()
  return (
    <div>
      Halls
    </div>
  )
}

export default Hall