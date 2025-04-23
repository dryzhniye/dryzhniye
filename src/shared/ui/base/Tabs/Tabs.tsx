'use client'
import * as Tabs from '@radix-ui/react-tabs'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import styles from './Tabs.module.scss'

export type Tab = {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

type TabsProps = {
  tabs: Tab[]
  /**
   * Параметр для синхронизации с URL
   * Например: 'part' для /settings?part=info
   */
  urlParamName?: string
  /**
   * Значение по умолчанию, если параметр не указан в URL
   */
  defaultValue?: string
}

export default function TabsComponent({
                                        tabs,
                                        urlParamName,
                                        defaultValue = tabs[0]?.id
                                      }: TabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Получаем текущее значение из URL параметра
  const paramValue = urlParamName ? searchParams.get(urlParamName) : null
  const activeTab = paramValue || defaultValue

  // Синхронизируем состояние табов с URL
  const handleValueChange = (value: string) => {
    if (!urlParamName) return

    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set(urlParamName, value)

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  // Синхронизация при монтировании (если нет параметра)
  useEffect(() => {
    if (urlParamName && !paramValue && defaultValue) {
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set(urlParamName, defaultValue)

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
    }
  }, [urlParamName, paramValue, defaultValue, pathname, searchParams, router])

  return (
    <Tabs.Root
      className={styles.Root}
      value={activeTab}
      onValueChange={handleValueChange}
    >
      <Tabs.List className={styles.List}>
        {tabs.map(tab => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className={styles.Trigger}
            disabled={tab.disabled}
          >
            {tab.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map(tab => (
        <Tabs.Content key={tab.id} value={tab.id} className={styles.tabContent}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}