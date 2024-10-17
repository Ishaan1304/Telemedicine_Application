import React, { useEffect } from 'react';
import styles from './ImageList.module.css'; 
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { getUserDocuments, InitialStateDocuments } from '@/redux/slice/documentsSlice';
import Image from 'next/image';

interface ImageListProps {
  patientUserID: string | string[] | undefined; 
}

const ImageList: React.FC<ImageListProps> = (props) => {
  const { patientUserID } = props;

  const fileNames = useAppSelector((state: { documents: InitialStateDocuments }) => state.documents.list);


  const dispatch = useAppDispatch();

  useEffect(() => {
    if (patientUserID && !Array.isArray(patientUserID) && Number(patientUserID) !== 0) {
      dispatch(getUserDocuments({ id: Number(patientUserID) }));
    }
  }, [dispatch, patientUserID]);

  return (
    <div className={styles.imageList}>
      {fileNames.map((data, index) => (
        <div key={index} className={styles.imageContainer}>
          <a 
            href={`http://localhost:8080/file/images/${data}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Image 
              src={`http://localhost:8080/file/images/${data}`} 
              alt={`Image ${index + 1}`} 
              className={styles.image} 
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
