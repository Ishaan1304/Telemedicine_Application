import React, { useState } from 'react';
import styles from './CustomSlider.module.css';

interface CustomSliderProps {
    children: React.ReactNode;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = React.Children.toArray(children);
    const totalItems = items.length;
    const itemsPerSlide = 3;
    const maxIndex = Math.ceil(totalItems / itemsPerSlide) - 1;

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
    };

    return (
        <div className={styles.sliderContainer}>
            <button className={styles.prevButton} onClick={goToPrev}>
                &lt;
            </button>
            <div className={styles.sliderWrapper}>
                <div
                    className={styles.sliderContent}
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className={styles.sliderItem}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <button className={styles.nextButton} onClick={goToNext}>
                &gt;
            </button>
        </div>
    );
};

export default CustomSlider;
