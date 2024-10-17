import React, { useState } from 'react';
import styles from './ReportsAndAnalysis.module.css';

interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  phone: string;
  countryName: string;
  stateName: string;
  cityName: string;
  address: string;
}

interface UserMapProps {
  userMap?: Map<string, User[]>; 
}

const ReportsAndAnalysis: React.FC<UserMapProps> = ({ userMap = new Map() }) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleAccordionToggle = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  if (!userMap || userMap.size === 0) {
    return <p>No users available.</p>;
  }

  return (
    <div className={styles.userList}>
      {Array.from(userMap.entries()).map(([key, users]) => {
        const [stateName, cityName] = key.split('-');
        const isActive = activeAccordion === key;

        return (
          <div key={key} className={styles.accordionItem}>
            <div
              className={`${styles.accordionHeader} ${isActive ? styles.accordionHeaderActive : ''}`}
              onClick={() => handleAccordionToggle(key)}
            >
              <h2>{`${stateName} - ${cityName}`}</h2>
              <span className={`${styles.accordionIcon} ${isActive ? styles.accordionIconActive : ''}`}>
                {isActive ? '-' : '+'}
              </span>
            </div>
            {isActive && (
              <div className={styles.accordionContent}>
                {users.map((user: User) => (
                  <div key={user.userID} className={styles.userCard}>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReportsAndAnalysis;
