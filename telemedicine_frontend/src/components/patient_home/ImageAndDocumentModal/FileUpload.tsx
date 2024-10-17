


import { useState } from 'react';
import styles from './FileUpload.module.css';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { uploadDocument, uploadDocumentSuccess} from '@/redux/slice/documentsSlice';

const FileUpload: React.FC = () => {

  


  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null); 
    setUploadStatus('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleUpload = async () => {
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
      //dispatch(uploadDocument({id:+id,formData:formData})); 
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
    <div className={styles.container}>
      <button onClick={openModal} className={styles.openModalButton}>
        Add Document
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Upload Document</h2>
              <button onClick={closeModal} className={styles.closeButton}>❌</button>
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

export default FileUpload;