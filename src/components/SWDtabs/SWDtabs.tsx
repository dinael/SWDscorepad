import { ReactNode, useState, FC, Children } from 'react'

import styles from './SWDtabs.module.scss'

export type SWDtabsProps = {
  tabName1: string
  tabName2: string
  total1: number
  total2: number
  children: ReactNode
  onTabChange: (activeTab: string) => void
}

export const SWDtabs: FC<SWDtabsProps> = ({
  tabName1,
  tabName2,
  total1,
  total2,
  children,
  onTabChange,
}: SWDtabsProps) => {
  const [activeTab, setActiveTab] = useState(tabName1)

  const statusTabs1 = activeTab === tabName1 ? 'active' : ''
  const statusTabs2 = activeTab === tabName2 ? 'active' : ''

  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabsBar}>
        <button
          className={`${styles.tabsControl} ${statusTabs1 ? styles.active : ''}`}
          type='button'
          onClick={() => {
            setActiveTab(tabName1)
            onTabChange(tabName1)
          }}>
          {tabName1}
          {total1 > 0 &&
            <span
              className={styles.total}
              aria-label={`VP total de ${tabName1}:`}>
              {total1 > 0 ? total1 : null}
            </span>
          }
        </button>
        <button
          className={`${styles.tabsControl} ${statusTabs2 ? styles.active : ''}`}
          type='button'
          onClick={() => {
            setActiveTab(tabName2)
            onTabChange(tabName2)
          }}>
          {tabName2}
          {total2 > 0 &&
            <span
              className={styles.total}
              aria-label={`VP total de ${tabName2}:`}>
              {total2 > 0 ? total2 : null}
            </span>
          }
        </button>
      </div>
      <article className={styles.tabsContainer}>
        {Children.map(children, (child, index) => {
          const isActive = activeTab === (index === 0 ? tabName1 : tabName2)
          return (
            <div className={isActive ? styles.tabContent : styles.tabContentHidden}>
              {child}
            </div>
          )
        })}
      </article>
    </div>
  )
}


export default SWDtabs