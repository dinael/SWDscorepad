import { ReactNode, useState, Children, FC, ReactElement } from 'react';

type TabChildProps = {
  'data-tab': string;
  children: React.ReactNode;
};

export type SWDtabsProps = {
  tabName1: string;
  tabName2: string;
  children: ReactNode;
};

export const SWDtabs: FC<SWDtabsProps> = ({
  tabName1,
  tabName2,
  children,
}: SWDtabsProps) => {
  const [activeTab, setActiveTab] = useState(tabName1);

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button
          className={activeTab === tabName1 ? 'active' : ''}
          onClick={() => setActiveTab(tabName1)}
        >
          {tabName1}
        </button>
        <button
          className={activeTab === tabName2 ? 'active' : ''}
          onClick={() => setActiveTab(tabName2)}
        >
          {tabName2}
        </button>
      </div>
      <div className="tab-content">
        {Children.map(children, (child) => {
          const tabChild = child as ReactElement<TabChildProps>;
          if (tabChild.props['data-tab'] === activeTab) {
            return tabChild;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SWDtabs;
