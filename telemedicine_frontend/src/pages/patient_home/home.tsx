import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import PatientLayout from "@/components/patient_home/PatientLayout/PatientLayout";
import PopupModal from "@/components/patient_home/PopupModal/PopupModal";
import ProviderList from "@/components/patient_home/ProviderList/ProviderList";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState<{ disease: string; location: string; specialty: string; description: string } | null>(null);
  const savedModalData = localStorage.getItem('modalData');
  useEffect(() => { 
    const shownModal = localStorage.getItem('modalShown');
    if (shownModal === "false") {
      setShowModal(true);
      localStorage.setItem('modalShown', 'true'); 
    }
    if (savedModalData) {
      setModalData(JSON.parse(savedModalData));
    }
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setModalData({disease:"",location:"",specialty:"",description:""}); 
    localStorage.setItem('modalData', "{\"disease\":\"\",\"location\":\"\",\"specialty\":\"\",\"description\":\"\"}");
  };

  const handleModalSubmit = (data: { disease: string; location: string; specialty: string; description: string }) => {
    setModalData(data); 
    localStorage.setItem('modalData', JSON.stringify(data));
  };

  return (
    <>
      <PatientLayout>
        <div className={styles.contentDiv}>
        {showModal && <PopupModal onClose={handleModalClose} onSubmit={handleModalSubmit} />}
        {modalData && <ProviderList data={modalData} />}
        </div>
      </PatientLayout>
    </>
  );
};

export default Home;
 