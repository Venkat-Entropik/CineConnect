import React, { FC } from "react";
import styles from "./EmptyState.module.scss";
import noResults from "../../assets/no-results.png";

interface EmptyStateProps {
  title: string;
  description: string;
  height: number | string;
}

const EmptyState: FC<EmptyStateProps> = ({ title, description, height = "100%" }) => {
  return (
    <div style={{ height: height }} className={styles["empty-state__container"]}>
      <img src={noResults} alt="no-results" className={styles["empty-state__placeholder"]} />
      <h3 className={styles["empty-state__title"]}>{title}</h3>
      {description && <h6 className={styles["empty-state__description"]}> {description}</h6>}
    </div>
  );
};

export default EmptyState;
