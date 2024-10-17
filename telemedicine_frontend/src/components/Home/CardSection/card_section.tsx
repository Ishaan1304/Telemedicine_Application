import React from 'react';
import styles from './card_section.module.css';
import Card from './Card/card';


const services = [
    {
        title: 'Virtual Consultation',
        description: 'Connect with a healthcare provider from the comfort of your home.',
    },
    {
        title: 'Remote Monitoring',
        description: 'Track your health metrics with wearable devices.',
    },
    {
        title: 'Prescription Management',
        description: 'Get your prescriptions and refills without visiting the clinic.',
    },
];

const CardSection: React.FC = () => {
    return (
        <div className={styles.cardSection}>
            <div className={styles.headingdiv}>
                <h1 className={styles.heading} >Our Services </h1>
            </div>
            <div>
                <div className={styles.cardParent} >
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CardSection;