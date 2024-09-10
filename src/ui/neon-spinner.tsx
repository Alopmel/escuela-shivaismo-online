// NeonSpinner.tsx
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './neonSpinner.module.css';

const NeonSpinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner animation="grow" variant="info" className={styles.neonSpinner} />
    </div>
  );
};

export default NeonSpinner;
