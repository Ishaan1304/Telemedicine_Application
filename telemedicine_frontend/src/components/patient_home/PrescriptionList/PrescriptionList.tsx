
import React, { useEffect, useState } from "react";
import styles from "./PrescriptionList.module.css";
import Link from "next/link";
import { getPrescribedProviders, InitialStatePrescriptions } from "@/redux/slice/prescriptionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getPatientProfile } from "@/redux/slice/patientProfileSlice";
import CustomSlider from "@/components/Common/Slider/CustomSlider";

interface Provider {
  providerID: number;
  specialty: string;
  user: {
    userID: number;
    firstName: string;
    lastName: string;
  };
}

const PrescriptionList: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = 300;
  const visibleCards = 3;

  const patientIDNumber = useAppSelector((state) => state.patientProfile.patientID);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      dispatch(getPatientProfile({ id: +id }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (patientIDNumber > 0) {
      dispatch(getPrescribedProviders({ patientID: patientIDNumber }));
    }
  }, [dispatch, patientIDNumber]);

  const prescribedProviders = useAppSelector((state: { prescription: InitialStatePrescriptions }) => state.prescription.providers);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    const totalCards = prescribedProviders ? prescribedProviders.length : 0;
    const maxIndex = Math.ceil(totalCards / visibleCards) - 1;
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  if (!prescribedProviders) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Prescriptions</h1>
      <CustomSlider>
            {prescribedProviders.map((provider) => (
              <div key={provider.providerID} className={styles.card}>
                <h2>{provider.user.firstName} {provider.user.lastName}</h2>
                <p><strong>Specialty:</strong> {provider.specialty}</p>
                <Link
                  href={{
                    pathname: `/prescriptions/${provider.providerID}`,
                    query: { patientID: patientIDNumber },
                  }}
                >
                  View Details
                </Link>
              </div>
            ))}
      </CustomSlider>
    </div>
  );
};

export default PrescriptionList;
