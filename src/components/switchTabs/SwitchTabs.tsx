import React, { FC, useState } from "react";

import "./style.scss";

interface SwitchTabsProps {
  data: string[];
  onTabChange: (tab: string, index?: number) => void;
}

const SwitchTabs: FC<SwitchTabsProps> = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const activeTab = (tab: string, index: number): void => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs" data-testid="switchingTabs">
      <div className="tabItems">
        {data.map((tab: string, index: number) => (
          <span
            key={tab}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
