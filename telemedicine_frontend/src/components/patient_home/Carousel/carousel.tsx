import React, { useEffect, useState } from "react";
import styles from "./carousel.module.css";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/redux/hooks/hooks";
import Link from "next/link";
import CustomSlider from "@/components/Common/Slider/CustomSlider";

export interface Provider {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: string;
  availableFrom: string;
  availableTo: string;
  user: {
    userID: number;
    firstName: string;
    lastName: string;
  };
}

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const providers =
    useAppSelector((state: any) => state.providers.providers) || [];

  const slideWidth = 300;
  const visibleCards = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, providers.length - visibleCards)
    );
  };

  return (
    <div className={styles.sliderContainer}>
      <CustomSlider>
        {providers.map((provider: Provider) => (
          <div key={provider.providerID} className={styles.card}>
            <h2>{provider.user.firstName + " " + provider.user.lastName}</h2>
            <p>
              <strong>Specialty:</strong> {provider.specialty}
            </p>
            <p>
              <strong>Gender:</strong> {provider.gender}
            </p>
            <p>
              <strong>Qualifications:</strong> {provider.qualifications}
            </p>
            <p>
              <strong>Consultation Fee:</strong> Rs. {provider.consultationFee}
            </p>
            <p>
              <strong>Available From:</strong> {provider.availableFrom}
            </p>
            <p>
              <strong>Available To:</strong> {provider.availableTo}
            </p>
            <div className={styles.linkContainer}>
              <Link
                href={{
                  pathname: `/providerAvailability/${provider.user.userID}`,
                }}
                className={styles.availSlots}
              >
                Check Available Slot
              </Link>
            </div>
          </div>
        ))}
      </CustomSlider>
    </div>
  );
};

export default Carousel;
