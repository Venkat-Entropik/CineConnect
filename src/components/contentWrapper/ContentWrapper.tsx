import React, { FC } from "react";

import "./style.scss";

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: FC<ContentWrapperProps> = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
