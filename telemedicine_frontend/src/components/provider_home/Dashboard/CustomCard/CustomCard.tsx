import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './CustomCard.module.css';

interface CustomCardProps {
  heading: string;
  description: string | number;
}

const CustomCard: React.FC<CustomCardProps> = ({ heading, description }) => {
  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography className={styles.heading} gutterBottom>
          {heading}
        </Typography>
        <Typography sx={{fontSize:"24px"}} className={styles.description}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
