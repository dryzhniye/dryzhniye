import * as Tabs from '@radix-ui/react-tabs'
import styles from './Tabs.module.scss'

export type Tab = {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

type TabsProps = {
  tabs: Tab[]
  defaultTab?: string
}

export default function TabsComponent({ tabs, defaultTab }: TabsProps) {
  return (
    <Tabs.Root className={styles.Root} defaultValue={defaultTab || tabs[0]?.id}>
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



