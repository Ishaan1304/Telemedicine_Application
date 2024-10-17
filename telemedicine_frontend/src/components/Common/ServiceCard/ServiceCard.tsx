// components/ServiceCard.tsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
    return (
        <Card elevation={3} className={styles.card}>
            <CardContent>
                <Typography variant="h5" gutterBottom className={styles.title}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className={styles.description}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
