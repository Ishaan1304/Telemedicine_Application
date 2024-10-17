import Link from "next/link";
import styles from "./PatientSidebar.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserProfilePic, InitialStateUsers, uploadUserProfilePic } from "@/redux/slice/usersSlice";
import Image from "next/image";
import { getPatientProfile, InitialStatePatientProfile } from "@/redux/slice/patientProfileSlice";


const PatientSidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userProfile = useAppSelector((state: { users: InitialStateUsers }) => state.users.userProfile);

  const updatingProfilePic = useAppSelector((state: { users: InitialStateUsers }) => state.users.updatingProfilePic);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      dispatch(getUserProfilePic(Number(id)));
    }
  }, [dispatch,updatingProfilePic]);


  const patientProfile = useAppSelector((state: { patientProfile: InitialStatePatientProfile }) => state.patientProfile);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      dispatch( getPatientProfile({id:(Number(id))}));
    }
  }, []);




  const profilePicUrl = userProfile?.profilePic 
    ? `http://localhost:8080/userProfile/images/get/${userProfile.profilePic}` 
    : "/assets/profile.png";


    const openModal = () => setIsModalOpen(true);


    const closeModal = () => {
      setIsModalOpen(false);
      setFile(null); 
      setUploadStatus('');
    };
  
    const handleFileChange = (event:any) => {
      if (event.target.files && event.target.files[0]) {
        setFile(event.target.files[0]);
      }
    };
  
    const handleUpload = () => {
      if (!file) {
        setUploadStatus('Please select a file to upload.');
        return;
      }
      setIsLoading(true);
      setUploadStatus('');
      const formData = new FormData();
      formData.append('image', file);
      const id = localStorage.getItem('id');
      if (!id) {
        setUploadStatus('User ID is not found.');
        setIsLoading(false);
        return;
      }
      try {
        dispatch(uploadUserProfilePic({id:+id,formData:formData})); 
        setUploadStatus('Upload successful!');
        setFile(null);
      } catch (error) {
        setUploadStatus('Upload failed. Please try again.');
      } finally {
        setIsLoading(false);
        setIsModalOpen(false);
      }
    };


  return (
    <div className={styles.sidebar}>
      <div className={styles.imageContainer}>
        <div className={styles.imageContainerMain}>
          <Image src={profilePicUrl} alt="Profile" width={150} height={150} className={styles.profilePic} />
          <button onClick={openModal} className={styles.editIcon}>✎</button>
        </div>
        <div className={styles.doctorInfo}>
        <h3>{patientProfile.user.firstName +" "+patientProfile.user.lastName}</h3>
        </div>
      </div>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/patient_home/home">
                <p className={router.pathname === "/patient_home/home" ? styles.activeLink : ""}>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link href="/patient_home/myappointments">
                <p className={router.pathname === "/patient_home/myappointments" ? styles.activeLink : ""}>My Appointments</p>
              </Link>
            </li>
            <li>
              <Link href="/patient_home/history">
                <p className={router.pathname === "/patient_home/history" ? styles.activeLink : ""}>App. History</p>
              </Link>
            </li>
            <li>
              <Link href="/patient_home/patient_profile_page">
                <p className={router.pathname === "/patient_home/patient_profile_page" ? styles.activeLink : ""}>Profile</p>
              </Link>
            </li>
            <li>
              <Link href="/patient_home/patientmessage">
                <p className={router.pathname === "/patient_home/patientmessage" ? styles.activeLink : ""}>Message</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Upload Document</h2>
              <button onClick={closeModal} className={styles.closeButton}>X</button>
            </div>
            <div className={styles.dropzoneWrapper}>
              <input 
                type="file" 
                onChange={handleFileChange} 
                className={styles.fileInput} 
              />
              <button 
                onClick={handleUpload} 
                className={styles.uploadButton} 
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
              {uploadStatus && <p className={styles.status}>{uploadStatus}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSidebar;
