import Link from "next/link";
import styles from "./SideBar.module.css";
import { SetStateAction, useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getUserProfilePic, InitialStateUsers, uploadUserProfilePic } from "@/redux/slice/usersSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { getProviderProfile, InitialStateProviderProfile } from "@/redux/slice/providerProfileSlice";

const Sidebar = () => {
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


  const providerProfile = useAppSelector((state: { providerProfile: InitialStateProviderProfile }) => state.providerProfile);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      dispatch( getProviderProfile({id:(Number(id))}));
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
          <h3>Dr. {providerProfile.user.firstName +" "+providerProfile.user.lastName}</h3>
          <h5>Qualifications: {providerProfile.qualifications}</h5>
          <h5>Speciality: {providerProfile.specialty}</h5>  
          <h5>Availability: From {providerProfile.availableFrom} to {providerProfile.availableTo}</h5>
        </div>
      </div>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/provider_home/home">
                <p className={router.pathname === "/provider_home/home" ? styles.activeLink : ""}>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link href="/provider_home/appointment_history">
                <p className={router.pathname === "/provider_home/appointment_history" ? styles.activeLink : ""}>Appointment History</p>
              </Link>
            </li>
            <li>
              <Link href="/provider_home/total_patients">
                <p className={router.pathname === "/provider_home/total_patients" ? styles.activeLink : ""}>All Patients</p>
              </Link>
            </li>
            <li>
              <Link href="/provider_home/profile_page">
                <p className={router.pathname === "/provider_home/profile_page" ? styles.activeLink : ""}>Profile</p>
              </Link>
            </li>
            <li>
              <Link href="/provider_home/message">
                <p className={router.pathname === "/provider_home/message" ? styles.activeLink : ""}>Message</p>
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

export default Sidebar;
