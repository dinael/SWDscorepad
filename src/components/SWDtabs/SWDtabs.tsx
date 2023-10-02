import React, { ReactNode, useState, FC, Children, CSSProperties } from 'react'

import './SWDtabs.scss'

export type SWDtabsProps = {
  tabName1: string
  tabName2: string
  total1: number
  total2: number
  activeTab?: string
  children: ReactNode
  onTabChange: (activeTab: string) => void
}

export const SWDtabs: FC<SWDtabsProps> = ({
  tabName1 = '',
  tabName2,
  total1,
  total2,
  children,
  onTabChange,
  ...props
}: SWDtabsProps) => {
  const [localActiveTab, setActiveTab] = useState(tabName1)

  const statusTabs1 = localActiveTab === tabName1 ? 'active' : ''
  const statusTabs2 = localActiveTab === tabName2 ? 'active' : ''

  return (
    <div className='tabs-wrapper' {...props}>
      <div className="tabs-bar">
        <button
          className={`tabs-control ${statusTabs1}`}
          type='button'
          onClick={() => {
            setActiveTab(tabName1)
            onTabChange(tabName1)
          }}>
          {tabName1}
          {total1 > 0 &&
            <span
              className='total'
              aria-label={`VP total de ${tabName1}:`}>
              {total1 > 0 ? total1 : null}
            </span>
          }
        </button>
        <button
          className={`tabs-control ${statusTabs2}`}
          type='button'
          onClick={() => {
            setActiveTab(tabName2)
            onTabChange(tabName2)
          }}>
          {tabName2}
          {total2 > 0 &&
            <span
              className='total'
              aria-label={`VP total de ${tabName1}:`}>
              {total2 > 0 ? total2 : null}
            </span>
          }
        </button>
      </div>
      <article className="tabs-container">
        {Children.map(children, (child, index) => {
          const isActive = localActiveTab === (index === 0 ? tabName1 : tabName2)
          const tabStyle: CSSProperties = {
            display: isActive ? 'block' : 'none',
          }
          return (
            <div style={tabStyle}>
              {child}
            </div>
          )
        })}
      </article>
    </div>
  )
}

export default SWDtabs
