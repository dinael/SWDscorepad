import { ReactNode, useState, FC, Children, CSSProperties } from 'react'

import { Tabs } from './SWDtabs-style'

export type SWDtabsProps = {
  tabName1: string
  tabName2: string
  total1: number
  total2: number
  children: ReactNode
}

export const SWDtabs: FC<SWDtabsProps> = ({
  tabName1,
  tabName2,
  total1,
  total2,
  children,
}: SWDtabsProps) => {
  const [activeTab, setActiveTab] = useState(tabName1)

  return (
    <Tabs.Wrapper>
      <Tabs.Bar className="tabs">
        <Tabs.Control
          className={activeTab === tabName1 ? 'active' : ''}
          onClick={() => setActiveTab(tabName1)}>
          {tabName1}
          <Tabs.Total>
            {total1 > 0 ? total1 : ''}
          </Tabs.Total>
        </Tabs.Control>
        <Tabs.Control
          className={activeTab === tabName2 ? 'active' : ''}
          onClick={() => setActiveTab(tabName2)}>
          {tabName2}
          <Tabs.Total>
            {total2 > 0 ? total2 : ''}
          </Tabs.Total>
        </Tabs.Control>
      </Tabs.Bar>
      <Tabs.Container className="tab-content">
        {Children.map(children, (child, index) => {
          const isActive = activeTab === (index === 0 ? tabName1 : tabName2)
          const tabStyle: CSSProperties = {
            display: isActive ? 'block' : 'none',
          }
          return (
            <div style={tabStyle}>
              {child}
            </div>
          )
        })}
      </Tabs.Container>
    </Tabs.Wrapper>
  )
}


export default SWDtabs